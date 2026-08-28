use anyhow::{bail, Context, Result};

use crate::model::Profile;

const PROFILE_DATA: &[(&str, &str)] = &[
    (
        "github-hosted-ubuntu-24.04",
        include_str!("../profiles/github-hosted-ubuntu-24.04.json"),
    ),
    (
        "act-nektos-ubuntu-22.04",
        include_str!("../profiles/act-nektos-ubuntu-22.04.json"),
    ),
    (
        "generic-linux-x64",
        include_str!("../profiles/generic-linux-x64.json"),
    ),
    (
        "self-hosted-linux-x64",
        include_str!("../profiles/self-hosted-linux-x64.json"),
    ),
];

pub fn all() -> Result<Vec<Profile>> {
    PROFILE_DATA
        .iter()
        .map(|(_, data)| serde_json::from_str(data).context("bundled profile is invalid"))
        .collect()
}

pub fn find(name: &str) -> Result<Profile> {
    let alias = match name {
        "github" | "github-hosted" => "github-hosted-ubuntu-24.04",
        "act" => "act-nektos-ubuntu-22.04",
        "generic" => "generic-linux-x64",
        "self-hosted" => "self-hosted-linux-x64",
        other => other,
    };
    for (id, data) in PROFILE_DATA {
        if *id == alias {
            return serde_json::from_str(data).context("bundled profile is invalid");
        }
    }
    bail!("unknown profile '{name}'. Run 'action-parity-probe profiles' to list choices")
}
