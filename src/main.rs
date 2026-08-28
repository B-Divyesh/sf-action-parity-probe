use std::{fs, path::PathBuf, process::ExitCode};

use action_parity_probe::{check_repository, model::Outcome, output, profile};
use anyhow::{bail, Context, Result};
use clap::{Parser, Subcommand};
use output::Format;

#[derive(Debug, Parser)]
#[command(
    name = "action-parity-probe",
    version,
    about = "Check GitHub Actions workflow differences before changing runners",
    long_about = "Inventory workflow requirements and compare them with a versioned runner profile. Workflow steps and actions are never executed."
)]
struct Cli {
    #[command(subcommand)]
    command: Command,
}

#[derive(Debug, Subcommand)]
enum Command {
    /// Check one workflow file or every workflow in a repository
    Check {
        /// Repository, workflow directory, or YAML workflow file
        #[arg(default_value = ".")]
        path: PathBuf,
        /// Bundled profile id or alias: github, act, generic, self-hosted
        #[arg(long, default_value = "act-nektos-ubuntu-22.04")]
        profile: String,
        /// Report format
        #[arg(long, value_enum, default_value = "terminal")]
        format: Format,
        /// Print JSON for CI scripts (short for --format json)
        #[arg(long, conflicts_with = "format")]
        json: bool,
        /// Write the report to this file instead of stdout
        #[arg(short, long)]
        output: Option<PathBuf>,
        /// Observe required tools and host properties
        #[arg(long, requires = "sandbox")]
        probe: bool,
        /// Confirm that probes may use a temporary local sandbox
        #[arg(long, requires = "probe")]
        sandbox: bool,
    },
    /// Run the real checker on the bundled sample in a temporary directory
    Demo,
    /// List bundled runner profiles
    Profiles {
        /// Print the full profile data as JSON
        #[arg(long)]
        json: bool,
    },
}

fn main() -> ExitCode {
    match run() {
        Ok(code) => ExitCode::from(code),
        Err(error) => {
            eprintln!("error: {error:#}");
            ExitCode::from(2)
        }
    }
}

fn run() -> Result<u8> {
    let cli = Cli::parse();
    match cli.command {
        Command::Check {
            path,
            profile,
            format,
            json,
            output,
            probe,
            sandbox: _,
        } => {
            let report = check_repository(&path, &profile, probe)?;
            let rendered = output::render(&report, if json { Format::Json } else { format })?;
            if let Some(path) = output {
                if let Some(parent) = path.parent() {
                    if !parent.as_os_str().is_empty() {
                        fs::create_dir_all(parent).with_context(|| {
                            format!("could not create output directory {}", parent.display())
                        })?;
                    }
                }
                fs::write(&path, rendered)
                    .with_context(|| format!("could not write report {}", path.display()))?;
            } else {
                print!("{rendered}");
            }
            Ok(if report.outcome == Outcome::Nonportable {
                1
            } else {
                0
            })
        }
        Command::Demo => run_demo(),
        Command::Profiles { json } => {
            let profiles = profile::all()?;
            if json {
                println!("{}", serde_json::to_string_pretty(&profiles)?);
            } else {
                println!("Bundled runner profiles\n");
                for profile in profiles {
                    println!(
                        "{}@{}\n  {}\n",
                        profile.id, profile.version, profile.description
                    );
                }
            }
            Ok(0)
        }
    }
}

fn run_demo() -> Result<u8> {
    let sandbox = tempfile::Builder::new()
        .prefix("action-parity-probe-demo-")
        .tempdir()
        .context("could not create the demo sandbox")?;
    let workflow_dir = sandbox.path().join("sample-repo/.github/workflows");
    fs::create_dir_all(&workflow_dir).context("could not prepare the demo sandbox")?;
    fs::write(
        workflow_dir.join("release.yml"),
        include_str!("../examples/sample-repo/.github/workflows/release.yml"),
    )
    .context("could not copy the sample workflow")?;
    let report = check_repository(
        &sandbox.path().join("sample-repo"),
        "act-nektos-ubuntu-22.04",
        true,
    )?;
    let terminal = output::render(&report, Format::Terminal)?;
    let markdown = output::render(&report, Format::Markdown)?;
    let report_path = sandbox.path().join("parity-report.md");
    fs::write(&report_path, markdown).context("could not write the demo report")?;
    let persisted = sandbox.keep();
    let persisted_report = persisted.join("parity-report.md");
    print!("{terminal}");
    println!("Demo — bundled sample data; your repository was not read or changed.");
    println!("Report: {}", persisted_report.display());
    if !persisted_report.exists() {
        bail!("demo report was not preserved");
    }
    Ok(0)
}
