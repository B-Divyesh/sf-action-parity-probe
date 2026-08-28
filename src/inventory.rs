use std::{collections::BTreeSet, fs, path::Path};

use anyhow::{bail, Context, Result};
use regex::Regex;
use serde_yaml::{Mapping, Value};
use walkdir::WalkDir;

use crate::model::{Inventory, LocatedValue};

const KNOWN_COMMANDS: &[&str] = &[
    "apt-get",
    "bash",
    "brew",
    "cargo",
    "curl",
    "docker",
    "gh",
    "git",
    "gradle",
    "java",
    "jq",
    "make",
    "mvn",
    "node",
    "npm",
    "pnpm",
    "pwsh",
    "python",
    "python3",
    "rustup",
    "sh",
    "sudo",
    "systemctl",
    "tar",
    "unzip",
    "wget",
    "yarn",
    "zip",
];

pub fn scan(root: &Path) -> Result<Inventory> {
    let files = workflow_files(root)?;
    if files.is_empty() {
        bail!(
            "no workflow files found. Point the command at a repository containing .github/workflows/*.yml"
        );
    }

    let display_root = if root.is_file() {
        root.parent().unwrap_or_else(|| Path::new("."))
    } else {
        root
    };
    let mut inventory = Inventory::default();
    for file in files {
        let display = file
            .strip_prefix(display_root)
            .unwrap_or(&file)
            .to_string_lossy()
            .replace('\\', "/");
        let source = fs::read_to_string(&file)
            .with_context(|| format!("could not read workflow {display}"))?;
        let document: Value = serde_yaml::from_str(&source)
            .with_context(|| format!("workflow {display} is not valid YAML"))?;
        inventory.workflow_files.push(display.clone());
        inspect_workflow(&document, &display, &mut inventory)?;
    }
    inventory.workflow_files.sort();
    sort_dedup(&mut inventory.actions);
    sort_dedup(&mut inventory.runner_labels);
    sort_dedup(&mut inventory.job_images);
    sort_dedup(&mut inventory.service_images);
    sort_dedup(&mut inventory.permissions);
    sort_dedup(&mut inventory.shells);
    sort_dedup(&mut inventory.commands);
    sort_dedup(&mut inventory.path_assumptions);
    Ok(inventory)
}

fn workflow_files(root: &Path) -> Result<Vec<std::path::PathBuf>> {
    if !root.exists() {
        bail!("input path '{}' does not exist", root.display());
    }
    if root.is_file() {
        let extension = root
            .extension()
            .and_then(|item| item.to_str())
            .unwrap_or("");
        if matches!(extension, "yml" | "yaml") {
            return Ok(vec![root.to_path_buf()]);
        }
        bail!("input file must end in .yml or .yaml");
    }

    let workflow_root = if root.ends_with(".github/workflows") {
        root.to_path_buf()
    } else {
        root.join(".github/workflows")
    };
    if !workflow_root.exists() {
        return Ok(Vec::new());
    }
    let mut files = WalkDir::new(workflow_root)
        .max_depth(2)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|entry| entry.file_type().is_file())
        .map(|entry| entry.into_path())
        .filter(|path| {
            matches!(
                path.extension().and_then(|item| item.to_str()),
                Some("yml" | "yaml")
            )
        })
        .collect::<Vec<_>>();
    files.sort();
    Ok(files)
}

fn inspect_workflow(document: &Value, file: &str, inventory: &mut Inventory) -> Result<()> {
    let root = document
        .as_mapping()
        .with_context(|| format!("workflow {file} must contain a YAML object"))?;
    collect_permissions(get(root, "permissions"), file, "workflow", inventory);
    let workflow_default_shell = get(root, "defaults")
        .and_then(Value::as_mapping)
        .and_then(|defaults| get(defaults, "run"))
        .and_then(Value::as_mapping)
        .and_then(|run| get(run, "shell"))
        .and_then(scalar);
    let Some(jobs) = get(root, "jobs").and_then(Value::as_mapping) else {
        bail!("workflow {file} has no jobs object");
    };
    for (job_key, job_value) in jobs {
        let job_name = scalar(job_key).unwrap_or_else(|| "unknown-job".into());
        let Some(job) = job_value.as_mapping() else {
            continue;
        };
        let job_location = format!("{file} · job {job_name}");
        collect_runs_on(get(job, "runs-on"), &job_location, inventory);
        collect_permissions(
            get(job, "permissions"),
            file,
            &format!("job {job_name}"),
            inventory,
        );
        if let Some(container) = get(job, "container") {
            if let Some(image) = image_value(container) {
                push(&mut inventory.job_images, image, &job_location);
            }
        }
        if let Some(services) = get(job, "services").and_then(Value::as_mapping) {
            for (service_key, service_value) in services {
                if let Some(image) = image_value(service_value) {
                    let service = scalar(service_key).unwrap_or_else(|| "service".into());
                    push(
                        &mut inventory.service_images,
                        image,
                        &format!("{job_location} · service {service}"),
                    );
                }
            }
        }

        let default_shell = get(job, "defaults")
            .and_then(Value::as_mapping)
            .and_then(|defaults| get(defaults, "run"))
            .and_then(Value::as_mapping)
            .and_then(|run| get(run, "shell"))
            .and_then(scalar)
            .or_else(|| workflow_default_shell.clone());
        if let Some(shell) = &default_shell {
            push(&mut inventory.shells, shell.clone(), &job_location);
        }
        if let Some(steps) = get(job, "steps").and_then(Value::as_sequence) {
            for (index, step_value) in steps.iter().enumerate() {
                let Some(step) = step_value.as_mapping() else {
                    continue;
                };
                let step_name = get(step, "name")
                    .and_then(scalar)
                    .unwrap_or_else(|| format!("step {}", index + 1));
                let location = format!("{job_location} · {step_name}");
                if let Some(action) = get(step, "uses").and_then(scalar) {
                    if let Some(image) = action.strip_prefix("docker://") {
                        push(&mut inventory.job_images, image.to_owned(), &location);
                    } else {
                        push(&mut inventory.actions, action, &location);
                    }
                }
                if let Some(script) = get(step, "run").and_then(scalar) {
                    let shell = get(step, "shell")
                        .and_then(scalar)
                        .or_else(|| default_shell.clone())
                        .unwrap_or_else(|| implicit_shell(job));
                    push(&mut inventory.shells, shell, &location);
                    collect_script(&script, &location, inventory);
                }
            }
        }
    }
    Ok(())
}

fn implicit_shell(job: &Mapping) -> String {
    let runner = get(job, "runs-on")
        .and_then(scalar)
        .unwrap_or_default()
        .to_ascii_lowercase();
    if runner.contains("windows") {
        "pwsh".into()
    } else {
        "bash".into()
    }
}

fn collect_runs_on(value: Option<&Value>, location: &str, inventory: &mut Inventory) {
    let Some(value) = value else { return };
    match value {
        Value::String(label) => push(&mut inventory.runner_labels, label.clone(), location),
        Value::Sequence(labels) => {
            for label in labels.iter().filter_map(scalar) {
                push(&mut inventory.runner_labels, label, location);
            }
        }
        other => {
            if let Some(label) = scalar(other) {
                push(&mut inventory.runner_labels, label, location);
            }
        }
    }
}

fn collect_permissions(value: Option<&Value>, file: &str, owner: &str, inventory: &mut Inventory) {
    let Some(value) = value else { return };
    let location = format!("{file} · {owner} permissions");
    if let Some(permission) = scalar(value) {
        push(&mut inventory.permissions, permission, &location);
    } else if let Some(items) = value.as_mapping() {
        for (name, level) in items {
            if let (Some(name), Some(level)) = (scalar(name), scalar(level)) {
                push(
                    &mut inventory.permissions,
                    format!("{name}: {level}"),
                    &location,
                );
            }
        }
    }
}

fn image_value(value: &Value) -> Option<String> {
    if let Some(image) = scalar(value) {
        return Some(image);
    }
    value
        .as_mapping()
        .and_then(|map| get(map, "image"))
        .and_then(scalar)
}

fn collect_script(script: &str, location: &str, inventory: &mut Inventory) {
    for command in KNOWN_COMMANDS {
        let pattern = format!(
            r"(?m)(?:^|[;&|]\s*|\bthen\s+)(?:sudo\s+)?{}(?:\s|$)",
            regex::escape(command)
        );
        if Regex::new(&pattern).is_ok_and(|matcher| matcher.is_match(script)) {
            push(&mut inventory.commands, (*command).into(), location);
        }
    }
    for assumption in ["/home/runner", "RUNNER_TOOL_CACHE", "/opt/hostedtoolcache"] {
        if script.contains(assumption) {
            push(
                &mut inventory.path_assumptions,
                assumption.to_owned(),
                location,
            );
        }
    }
}

fn scalar(value: &Value) -> Option<String> {
    match value {
        Value::String(value) => Some(value.clone()),
        Value::Bool(value) => Some(value.to_string()),
        Value::Number(value) => Some(value.to_string()),
        _ => None,
    }
}

fn get<'a>(map: &'a Mapping, key: &str) -> Option<&'a Value> {
    map.get(Value::String(key.to_owned()))
}

fn push(target: &mut Vec<LocatedValue>, value: String, location: &str) {
    target.push(LocatedValue {
        value,
        location: location.to_owned(),
    });
}

fn sort_dedup(items: &mut Vec<LocatedValue>) {
    let mut seen = BTreeSet::new();
    items.retain(|item| seen.insert((item.location.clone(), item.value.clone())));
    items.sort_by(|a, b| a.location.cmp(&b.location).then(a.value.cmp(&b.value)));
}

#[cfg(test)]
mod tests {
    use std::fs;

    use tempfile::tempdir;

    use super::*;

    #[test]
    fn inventories_declared_requirements() {
        let dir = tempdir().unwrap();
        let workflow_dir = dir.path().join(".github/workflows");
        fs::create_dir_all(&workflow_dir).unwrap();
        fs::write(
            workflow_dir.join("ci.yml"),
            r#"
name: CI
on: push
permissions:
  contents: read
  id-token: write
defaults:
  run:
    shell: fish
jobs:
  test:
    runs-on: [self-hosted, linux, x64]
    container: node:22
    services:
      postgres:
        image: postgres:17
    steps:
      - uses: actions/checkout@v4
      - name: Test
        shell: pwsh
        run: |
          gh auth status
          docker version
          cat /home/runner/file
"#,
        )
        .unwrap();

        let result = scan(dir.path()).unwrap();
        assert_eq!(result.workflow_files, vec![".github/workflows/ci.yml"]);
        assert!(result
            .actions
            .iter()
            .any(|item| item.value == "actions/checkout@v4"));
        assert!(result
            .service_images
            .iter()
            .any(|item| item.value == "postgres:17"));
        assert!(result
            .permissions
            .iter()
            .any(|item| item.value == "id-token: write"));
        assert!(result.shells.iter().any(|item| item.value == "pwsh"));
        assert!(result.shells.iter().any(|item| item.value == "fish"));
        assert!(result.commands.iter().any(|item| item.value == "gh"));
        assert!(result
            .path_assumptions
            .iter()
            .any(|item| item.value == "/home/runner"));
    }
}
