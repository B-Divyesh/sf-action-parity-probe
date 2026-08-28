pub mod analyze;
pub mod inventory;
pub mod model;
pub mod output;
pub mod probe;
pub mod profile;

use std::path::Path;

use anyhow::Result;
use model::Report;

pub fn check_repository(path: &Path, profile_name: &str, run_probes: bool) -> Result<Report> {
    let profile = profile::find(profile_name)?;
    let inventory = inventory::scan(path)?;
    let mut findings = analyze::compare(&inventory, &profile);
    let observations = if run_probes {
        let result = probe::run(&inventory)?;
        findings.extend(result.findings.clone());
        result.observations
    } else {
        Vec::new()
    };

    Ok(Report::new(profile, inventory, findings, observations))
}
