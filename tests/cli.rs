use std::fs;

use assert_cmd::Command;
use predicates::prelude::*;
use tempfile::tempdir;

#[test]
fn help_explains_the_safety_boundary() {
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    command
        .arg("--help")
        .assert()
        .success()
        .stdout(predicate::str::contains("never executed"));
}

#[test]
fn json_report_is_scriptable() {
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    let output = command
        .args([
            "check",
            "examples/sample-repo",
            "--profile",
            "generic",
            "--format",
            "json",
        ])
        .output()
        .unwrap();
    assert_eq!(output.status.code(), Some(1));
    let report: serde_json::Value = serde_json::from_slice(&output.stdout).unwrap();
    assert_eq!(report["outcome"], "nonportable");
    assert!(report["summary"]["errors"].as_u64().unwrap() >= 8);
    assert!(output.stderr.is_empty());
}

#[test]
fn json_shorthand_is_scriptable() {
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    let output = command
        .args([
            "check",
            "examples/sample-repo",
            "--profile",
            "generic",
            "--json",
        ])
        .output()
        .unwrap();
    assert_eq!(output.status.code(), Some(1));
    let report: serde_json::Value = serde_json::from_slice(&output.stdout).unwrap();
    assert_eq!(report["schema_version"], "1");
}

#[test]
fn probe_requires_explicit_sandbox_flag() {
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    command
        .args(["check", "examples/sample-repo", "--probe"])
        .assert()
        .failure()
        .code(2)
        .stderr(predicate::str::contains("--sandbox"));
}

#[test]
fn malformed_workflow_explains_the_next_step() {
    let dir = tempdir().unwrap();
    let workflow_dir = dir.path().join(".github/workflows");
    fs::create_dir_all(&workflow_dir).unwrap();
    fs::write(workflow_dir.join("bad.yml"), "jobs: [").unwrap();
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    command
        .args(["check", dir.path().to_str().unwrap()])
        .assert()
        .failure()
        .code(2)
        .stderr(predicate::str::contains("not valid YAML"));
}

#[test]
fn demo_writes_a_portable_report() {
    let mut command = Command::cargo_bin("action-parity-probe").unwrap();
    command
        .arg("demo")
        .assert()
        .success()
        .stdout(predicate::str::contains("Demo — bundled sample data"))
        .stdout(predicate::str::contains("Report: /tmp/"));
}
