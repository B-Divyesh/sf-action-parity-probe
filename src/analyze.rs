use crate::model::{EvidenceSource, Finding, Inventory, LocatedValue, Profile, Severity};

pub fn compare(inventory: &Inventory, profile: &Profile) -> Vec<Finding> {
    let mut findings = Vec::new();

    for label in &inventory.runner_labels {
        if label.value.contains("${{") {
            findings.push(finding(
                "APP002",
                Severity::Warning,
                "Dynamic runner label needs a manual check",
                label,
                "Resolve the expression and compare every possible label with the target profile.",
            ));
        } else if !profile
            .runner_labels
            .iter()
            .any(|item| item == &label.value)
        {
            findings.push(finding(
                "APP001",
                Severity::Error,
                "Runner label is not in the target profile",
                label,
                "Map this job to a label listed by the target runner profile.",
            ));
        }
        if label.value == "ubuntu-latest" {
            findings.push(finding(
                "APP003",
                Severity::Warning,
                "Floating runner image can drift",
                label,
                "Use an explicit Ubuntu label and keep the selected profile version in review artifacts.",
            ));
        }
    }

    for image in &inventory.job_images {
        if !profile.supports_job_containers {
            findings.push(finding(
                "APP010",
                Severity::Error,
                "Job container is not supported",
                image,
                "Remove the job container or choose a target with container support.",
            ));
        }
        if !image.value.contains("@sha256:") {
            findings.push(finding(
                "APP012",
                Severity::Warning,
                "Container image is not pinned by digest",
                image,
                "Pin the image digest so both runners use the same filesystem.",
            ));
        }
    }
    for image in &inventory.service_images {
        if !profile.supports_services {
            findings.push(finding(
                "APP011",
                Severity::Error,
                "Service container is not supported",
                image,
                "Provision this dependency another way or choose a target with service support.",
            ));
        }
        if !image.value.contains("@sha256:") {
            findings.push(finding(
                "APP012",
                Severity::Warning,
                "Container image is not pinned by digest",
                image,
                "Pin the image digest so both runners use the same service version.",
            ));
        }
    }

    for permission in &inventory.permissions {
        if permission.value.eq_ignore_ascii_case("id-token: write") && !profile.supports_oidc {
            findings.push(finding(
                "APP020",
                Severity::Error,
                "OIDC token exchange is not supported",
                permission,
                "Use a runner integration that issues GitHub OIDC tokens or replace this authentication step.",
            ));
        }
    }

    for shell in &inventory.shells {
        let executable = shell
            .value
            .split_whitespace()
            .next()
            .unwrap_or(&shell.value)
            .trim_end_matches(".exe");
        if shell.value.contains("${{") {
            findings.push(finding(
                "APP031",
                Severity::Warning,
                "Dynamic shell needs a manual check",
                shell,
                "Resolve the shell expression and verify the executable on the target.",
            ));
        } else if !profile.shells.iter().any(|item| item == executable) {
            findings.push(finding(
                "APP030",
                Severity::Error,
                "Shell is absent from the target profile",
                shell,
                "Install this shell or change the step to one listed by the target profile.",
            ));
        }
    }

    for action in &inventory.actions {
        let action_name = action.value.split('@').next().unwrap_or(&action.value);
        if profile
            .hosted_only_actions
            .iter()
            .any(|prefix| action_name.starts_with(prefix))
        {
            findings.push(finding(
                "APP040",
                Severity::Error,
                "Action depends on GitHub-hosted runner behavior",
                action,
                "Test this action on the target or replace it with portable commands.",
            ));
        }
        if !action.value.starts_with("./") && !is_sha_pinned(&action.value) {
            findings.push(finding(
                "APP041",
                Severity::Warning,
                "Action reference is mutable",
                action,
                "Pin the action to a full commit SHA for repeatable comparisons.",
            ));
        }
    }

    for command in &inventory.commands {
        if command.value == "docker" && !profile.docker_access {
            findings.push(finding(
                "APP051",
                Severity::Error,
                "Docker access is not available",
                command,
                "Choose a runner with Docker access or remove the Docker command.",
            ));
        } else if !profile.commands.iter().any(|item| item == &command.value) {
            findings.push(finding(
                "APP050",
                Severity::Warning,
                "Command is not listed in the target image",
                command,
                "Install this command explicitly before the step, then run an observed probe.",
            ));
        }
    }

    if !profile.github_host_paths {
        for path in &inventory.path_assumptions {
            findings.push(finding(
                "APP060",
                Severity::Error,
                "GitHub-hosted path is not portable",
                path,
                "Use runner context variables or a path created inside the job.",
            ));
        }
    }

    findings
}

fn is_sha_pinned(action: &str) -> bool {
    let Some((_, reference)) = action.rsplit_once('@') else {
        return false;
    };
    reference.len() == 40
        && reference
            .chars()
            .all(|character| character.is_ascii_hexdigit())
}

fn finding(
    rule_id: &str,
    severity: Severity,
    title: &str,
    requirement: &LocatedValue,
    recommendation: &str,
) -> Finding {
    Finding {
        rule_id: rule_id.into(),
        severity,
        source: EvidenceSource::Static,
        title: title.into(),
        evidence: requirement.value.clone(),
        location: requirement.location.clone(),
        recommendation: recommendation.into(),
    }
}

#[cfg(test)]
mod tests {
    use crate::{inventory, profile};

    use super::*;

    #[test]
    fn flags_at_least_eight_known_cross_runner_failures() {
        let inventory = inventory::scan(std::path::Path::new("examples/sample-repo")).unwrap();
        let profile = profile::find("generic-linux-x64").unwrap();
        let findings = compare(&inventory, &profile);
        let errors = findings
            .iter()
            .filter(|finding| finding.severity == Severity::Error)
            .count();
        assert!(
            errors >= 8,
            "expected at least 8 errors, got {errors}: {findings:#?}"
        );
    }
}
