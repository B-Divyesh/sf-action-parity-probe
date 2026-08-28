use std::collections::BTreeMap;

use anyhow::Result;
use serde_json::json;

use crate::model::{EvidenceSource, Inventory, Outcome, Report, Severity};

#[derive(Debug, Clone, Copy, clap::ValueEnum)]
pub enum Format {
    Terminal,
    Json,
    Markdown,
    Sarif,
}

pub fn render(report: &Report, format: Format) -> Result<String> {
    match format {
        Format::Terminal => Ok(terminal(report)),
        Format::Json => Ok(format!("{}\n", serde_json::to_string_pretty(report)?)),
        Format::Markdown => Ok(markdown(report)),
        Format::Sarif => Ok(format!(
            "{}\n",
            serde_json::to_string_pretty(&sarif(report))?
        )),
    }
}

fn terminal(report: &Report) -> String {
    let outcome = match report.outcome {
        Outcome::Portable => "PORTABLE",
        Outcome::Review => "REVIEW",
        Outcome::Nonportable => "NONPORTABLE",
    };
    let mut output = format!(
        "Action Parity Probe v{}\nTarget: {} @ {}\nResult: {} · {} errors · {} warnings\nScanned: {} workflow files · {} requirements\n",
        report.tool_version,
        report.profile.label,
        report.profile.version,
        outcome,
        report.summary.errors,
        report.summary.warnings,
        report.summary.workflow_files,
        report.summary.requirements,
    );
    if report.findings.is_empty() {
        output.push_str("\n✓ No known differences found for this profile.\n");
    } else {
        output.push_str("\nFINDINGS\n");
        for finding in &report.findings {
            let mark = match finding.severity {
                Severity::Error => "×",
                Severity::Warning => "!",
            };
            let source = match finding.source {
                EvidenceSource::Static => "static",
                EvidenceSource::Observed => "observed",
            };
            output.push_str(&format!(
                "{mark} {} [{} · {source}] {}\n  {}\n  Evidence: {}\n  Next: {}\n",
                finding.rule_id,
                severity_name(finding.severity),
                finding.title,
                finding.location,
                finding.evidence,
                finding.recommendation,
            ));
        }
    }
    if !report.observations.is_empty() {
        output.push_str("\nOBSERVED PROBES\n");
        for item in &report.observations {
            output.push_str(&format!(
                "{} {} — {}\n",
                item.status, item.probe, item.detail
            ));
        }
    }
    output.push_str("\nStatic findings are declarations. Observed findings come from the opt-in sandbox probe.\n");
    output
}

fn markdown(report: &Report) -> String {
    let mut output = format!(
        "# Action Parity Probe report\n\n**Target:** {} (`{}@{}`)  \n**Result:** **{:?}** — {} errors, {} warnings  \n**Scope:** {} workflow files, {} declared requirements\n\n",
        escape(&report.profile.label),
        escape(&report.profile.id),
        escape(&report.profile.version),
        report.outcome,
        report.summary.errors,
        report.summary.warnings,
        report.summary.workflow_files,
        report.summary.requirements,
    );
    output.push_str("## Findings\n\n");
    if report.findings.is_empty() {
        output.push_str("No known differences were found for this profile.\n\n");
    } else {
        output.push_str(
            "| Level | Source | Rule | Requirement | Location |\n| --- | --- | --- | --- | --- |\n",
        );
        for finding in &report.findings {
            output.push_str(&format!(
                "| {} | {:?} | `{}` {} | `{}` | {} |\n",
                severity_name(finding.severity),
                finding.source,
                escape(&finding.rule_id),
                escape(&finding.title),
                escape(&finding.evidence),
                escape(&finding.location),
            ));
        }
        output.push('\n');
        for finding in &report.findings {
            output.push_str(&format!(
                "- **{}:** {}\n",
                escape(&finding.rule_id),
                escape(&finding.recommendation)
            ));
        }
        output.push('\n');
    }
    output.push_str("## Inventory\n\n");
    inventory_markdown(&mut output, &report.inventory);
    if !report.observations.is_empty() {
        output.push_str("## Observed probes\n\n");
        for item in &report.observations {
            output.push_str(&format!(
                "- **{}** `{}` — {}\n",
                escape(&item.status),
                escape(&item.probe),
                escape(&item.detail)
            ));
        }
        output.push('\n');
    }
    output.push_str("---\nStatic findings come from workflow declarations. Observed findings come from the explicit sandbox probe. No workflow steps were run.\n");
    output
}

fn inventory_markdown(output: &mut String, inventory: &Inventory) {
    let groups = [
        ("Actions", &inventory.actions),
        ("Runner labels", &inventory.runner_labels),
        ("Job images", &inventory.job_images),
        ("Service images", &inventory.service_images),
        ("Permissions", &inventory.permissions),
        ("Shells", &inventory.shells),
        ("Commands", &inventory.commands),
        ("Host paths", &inventory.path_assumptions),
    ];
    for (name, items) in groups {
        output.push_str(&format!("### {name}\n\n"));
        if items.is_empty() {
            output.push_str("None declared or detected.\n\n");
        } else {
            for item in items {
                output.push_str(&format!(
                    "- `{}` — {}\n",
                    escape(&item.value),
                    escape(&item.location)
                ));
            }
            output.push('\n');
        }
    }
}

fn sarif(report: &Report) -> serde_json::Value {
    let mut unique_rules = BTreeMap::new();
    for finding in &report.findings {
        unique_rules
            .entry(finding.rule_id.clone())
            .or_insert_with(|| {
                json!({
                    "id": finding.rule_id,
                    "shortDescription": { "text": finding.title },
                    "help": { "text": finding.recommendation }
                })
            });
    }
    let rules = unique_rules.into_values().collect::<Vec<_>>();
    let results = report
        .findings
        .iter()
        .map(|finding| {
            let uri = finding
                .location
                .split(" · ")
                .next()
                .unwrap_or(&finding.location);
            json!({
                "ruleId": finding.rule_id,
                "level": if finding.severity == Severity::Error { "error" } else { "warning" },
                "message": { "text": format!("{}: {}", finding.title, finding.evidence) },
                "locations": [{
                    "physicalLocation": { "artifactLocation": { "uri": uri } },
                    "logicalLocations": [{ "name": finding.location }]
                }],
                "properties": { "evidenceSource": format!("{:?}", finding.source).to_lowercase() }
            })
        })
        .collect::<Vec<_>>();
    json!({
        "$schema": "https://json.schemastore.org/sarif-2.1.0.json",
        "version": "2.1.0",
        "runs": [{
            "tool": { "driver": {
                "name": "Action Parity Probe",
                "version": report.tool_version,
                "informationUri": "https://action-parity-probe.sociobot.in",
                "rules": rules
            }},
            "results": results
        }]
    })
}

fn severity_name(severity: Severity) -> &'static str {
    match severity {
        Severity::Warning => "warning",
        Severity::Error => "error",
    }
}

fn escape(value: &str) -> String {
    value.replace('|', "\\|").replace('\n', " ")
}
