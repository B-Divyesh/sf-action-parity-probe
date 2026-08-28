# Action Parity Probe

Check a GitHub Actions workflow before changing runners.

Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and
plain Linux runners. It inventories what a workflow expects, compares those
requirements with a versioned runner profile, and separates static warnings
from failures observed by safe local probes. It never runs workflow steps.

## Install

```sh
cargo install --path .
action-parity-probe --help
```

Rust 1.85 or newer is required. Releases can be packaged as one binary with
`cargo build --release`.

## Try the bundled demo

```sh
action-parity-probe demo
```

The command copies a sample repository into a temporary directory, checks it
against the bundled `act-nektos-ubuntu-22.04@2026-08` profile, writes a Markdown
report, and prints its path. Nothing is written to your repository.

The same sample appears at
[action-parity-probe.sociobot.in/demo](https://action-parity-probe.sociobot.in/demo).

## Check a repository

```sh
# Human-readable report. Exit 1 means a nonportable requirement was found.
action-parity-probe check . --profile act-nektos-ubuntu-22.04

# Machine-readable report for CI.
action-parity-probe check . \
  --profile generic-linux-x64 \
  --json \
  --output parity-report.json

# Add safe, observed environment probes. The explicit flag is required.
action-parity-probe check . \
  --profile self-hosted-linux-x64 \
  --probe --sandbox

# List bundled, versioned profiles.
action-parity-probe profiles
```

The probe suite only tests the current host for declared commands, shells,
case sensitivity, and Docker access. It uses a temporary directory. It does
not execute workflow files, actions, or step scripts.

### Output formats

- `terminal`: compact report for people.
- `json`: stable, typed report for scripts.
- `markdown`: portable review artifact.
- `sarif`: findings for code-scanning tools.

Exit codes are `0` for portable or warning-only reports, `1` when at least one
nonportable requirement is found, and `2` for invalid input or usage.

## What it checks

The inventory includes action references, job and service images, requested
permissions, runner labels, explicit shells, and command assumptions in `run`
steps. Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and
self-hosted Linux. Rules flag runner labels, service support, job containers,
OIDC, shells, hosted-only actions, floating action refs, missing commands, and
common host-path assumptions.

This is a readiness check. It is not a CI runner, a workflow translator, or a
guarantee that a workflow will pass.

## Develop and verify

```sh
npm ci
npm test
npm run build
scripts/verify-url.sh http://127.0.0.1:4173/
```

`npm test` runs Rust tests plus the site and claim tests. `npm run build`
creates the static site at `dist/site/`. Run only the Rust suite with
`cargo test`. Package the CLI with `cargo package --allow-dirty`.

## Privacy and security

The CLI has no telemetry and makes no network requests. Repository contents
stay on the machine where the command runs. The site has no accounts,
analytics, third-party scripts, cookies, or browser storage.

## License

MIT. See [LICENSE](LICENSE).
