use std::{collections::BTreeSet, env, fs, path::Path};

use anyhow::{Context, Result};
use tempfile::tempdir;

use crate::model::{EvidenceSource, Finding, Inventory, Observation, Severity};

pub struct ProbeResult {
    pub findings: Vec<Finding>,
    pub observations: Vec<Observation>,
}

pub fn run(inventory: &Inventory) -> Result<ProbeResult> {
    let sandbox = tempdir().context("could not create the probe sandbox")?;
    let mut findings = Vec::new();
    let mut observations = Vec::new();

    let commands = inventory
        .commands
        .iter()
        .map(|item| item.value.as_str())
        .chain(inventory.shells.iter().filter_map(|item| {
            item.value
                .split_whitespace()
                .next()
                .map(|shell| shell.trim_end_matches(".exe"))
        }))
        .collect::<BTreeSet<_>>();

    for command in commands {
        let available = command_path(command).is_some();
        observations.push(Observation {
            probe: format!("command:{command}"),
            status: if available { "pass" } else { "fail" }.into(),
            detail: if available {
                format!("{command} is available on PATH")
            } else {
                format!("{command} is missing from PATH")
            },
        });
        if !available {
            let location = inventory
                .commands
                .iter()
                .chain(inventory.shells.iter())
                .find(|item| item.value.split_whitespace().next() == Some(command))
                .map(|item| item.location.clone())
                .unwrap_or_else(|| "probe sandbox".into());
            findings.push(Finding {
                rule_id: "APP100".into(),
                severity: Severity::Error,
                source: EvidenceSource::Observed,
                title: "Required executable was not found".into(),
                evidence: command.into(),
                location,
                recommendation:
                    "Install the executable on this runner and repeat the sandbox probe.".into(),
            });
        }
    }

    let upper = sandbox.path().join("ParityCase");
    let lower = sandbox.path().join("paritycase");
    fs::write(&upper, "upper").context("could not write in the probe sandbox")?;
    fs::write(&lower, "lower").context("could not test filesystem case sensitivity")?;
    let case_sensitive = fs::read_to_string(&upper).unwrap_or_default()
        != fs::read_to_string(&lower).unwrap_or_default();
    observations.push(Observation {
        probe: "filesystem:case-sensitive".into(),
        status: if case_sensitive { "pass" } else { "note" }.into(),
        detail: if case_sensitive {
            "filesystem keeps names that differ only by case".into()
        } else {
            "filesystem merges names that differ only by case".into()
        },
    });

    if inventory.commands.iter().any(|item| item.value == "docker") {
        let socket = Path::new("/var/run/docker.sock");
        let available = socket.exists();
        observations.push(Observation {
            probe: "docker:socket".into(),
            status: if available { "pass" } else { "fail" }.into(),
            detail: if available {
                "Docker socket exists".into()
            } else {
                "Docker socket was not found".into()
            },
        });
        if !available {
            findings.push(Finding {
                rule_id: "APP101".into(),
                severity: Severity::Error,
                source: EvidenceSource::Observed,
                title: "Docker socket was not observed".into(),
                evidence: "/var/run/docker.sock".into(),
                location: "probe sandbox".into(),
                recommendation: "Expose a Docker socket or remove Docker-dependent steps.".into(),
            });
        }
    }

    Ok(ProbeResult {
        findings,
        observations,
    })
}

fn command_path(command: &str) -> Option<std::path::PathBuf> {
    if command.contains('/') {
        let path = Path::new(command);
        return path.is_file().then(|| path.to_path_buf());
    }
    env::split_paths(&env::var_os("PATH")?).find_map(|directory| {
        let candidate = directory.join(command);
        candidate.is_file().then_some(candidate)
    })
}
