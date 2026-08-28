use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct LocatedValue {
    pub value: String,
    pub location: String,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq, Eq)]
pub struct Inventory {
    pub workflow_files: Vec<String>,
    pub actions: Vec<LocatedValue>,
    pub runner_labels: Vec<LocatedValue>,
    pub job_images: Vec<LocatedValue>,
    pub service_images: Vec<LocatedValue>,
    pub permissions: Vec<LocatedValue>,
    pub shells: Vec<LocatedValue>,
    pub commands: Vec<LocatedValue>,
    pub path_assumptions: Vec<LocatedValue>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Profile {
    pub id: String,
    pub version: String,
    pub label: String,
    pub description: String,
    pub os: String,
    pub architecture: String,
    pub runner_labels: Vec<String>,
    pub shells: Vec<String>,
    pub commands: Vec<String>,
    pub hosted_only_actions: Vec<String>,
    pub supports_job_containers: bool,
    pub supports_services: bool,
    pub supports_oidc: bool,
    pub github_host_paths: bool,
    pub docker_access: bool,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Severity {
    Warning,
    Error,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum EvidenceSource {
    Static,
    Observed,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Finding {
    pub rule_id: String,
    pub severity: Severity,
    pub source: EvidenceSource,
    pub title: String,
    pub evidence: String,
    pub location: String,
    pub recommendation: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Observation {
    pub probe: String,
    pub status: String,
    pub detail: String,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum Outcome {
    Portable,
    Review,
    Nonportable,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Report {
    pub schema_version: String,
    pub tool_version: String,
    pub profile: Profile,
    pub outcome: Outcome,
    pub summary: Summary,
    pub inventory: Inventory,
    pub findings: Vec<Finding>,
    pub observations: Vec<Observation>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Summary {
    pub workflow_files: usize,
    pub requirements: usize,
    pub warnings: usize,
    pub errors: usize,
    pub observed_failures: usize,
}

impl Report {
    pub fn new(
        profile: Profile,
        inventory: Inventory,
        mut findings: Vec<Finding>,
        observations: Vec<Observation>,
    ) -> Self {
        findings.sort_by(|a, b| a.location.cmp(&b.location).then(a.rule_id.cmp(&b.rule_id)));
        let errors = findings
            .iter()
            .filter(|item| item.severity == Severity::Error)
            .count();
        let warnings = findings.len() - errors;
        let observed_failures = findings
            .iter()
            .filter(|item| {
                item.source == EvidenceSource::Observed && item.severity == Severity::Error
            })
            .count();
        let requirements = inventory.actions.len()
            + inventory.runner_labels.len()
            + inventory.job_images.len()
            + inventory.service_images.len()
            + inventory.permissions.len()
            + inventory.shells.len()
            + inventory.commands.len()
            + inventory.path_assumptions.len();
        let outcome = if errors > 0 {
            Outcome::Nonportable
        } else if warnings > 0 {
            Outcome::Review
        } else {
            Outcome::Portable
        };
        let workflow_files = inventory.workflow_files.len();
        Self {
            schema_version: "1".into(),
            tool_version: env!("CARGO_PKG_VERSION").into(),
            profile,
            outcome,
            summary: Summary {
                workflow_files,
                requirements,
                warnings,
                errors,
                observed_failures,
            },
            inventory,
            findings,
            observations,
        }
    }
}
