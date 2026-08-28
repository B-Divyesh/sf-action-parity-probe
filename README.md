# Action Parity Probe

Check a GitHub Actions workflow before changing runners.

Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and
plain Linux runners. It inventories workflow requirements and compares them
with a versioned runner profile. Static warnings stay separate from opt-in host
checks that run only with `--probe --sandbox`. It never runs workflow steps.

## Install

```sh
cargo install --path .
action-parity-probe --help
```

## Try the bundled demo

```sh
action-parity-probe demo
```

The command copies a sample repository to a temporary directory. It checks the
bundled `act` profile. It saves a Markdown report and prints the path. Nothing
is written to your repository.

Open the same sample report at
[action-parity-probe.sociobot.in/?demo=1](https://action-parity-probe.sociobot.in/?demo=1).

## Check a repository

```sh
# Human-readable report. Exit 1 means a nonportable requirement was found.
action-parity-probe check . --profile act-nektos-ubuntu-22.04

# Machine-readable report for CI.
action-parity-probe check . \
  --profile generic-linux-x64 \
  --json \
  --output parity-report.json

# Check the current host without running workflow steps.
action-parity-probe check . \
  --profile self-hosted-linux-x64 \
  --probe --sandbox

# List bundled, versioned profiles.
action-parity-probe profiles
```

The probe checks declared commands and shells on the current host. It also
reports filesystem case behavior and Docker socket access. It does not execute
workflow files, actions, or step scripts.

### Output formats

- `terminal`: compact report for people.
- `json`: structured output for scripts.
- `markdown`: a report you can attach to a review.
- `sarif`: findings for code-scanning tools.

Exit `0` means portable or warnings only. Exit `1` means a nonportable
requirement. Exit `2` means invalid input or usage.

## What it checks

The inventory includes action references, job and service images, requested
permissions, runner labels, explicit shells, and command assumptions in `run`
steps. Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and
self-hosted Linux.

Rules check runner labels, services, and job containers. They check OpenID
Connect (OIDC) permissions and unavailable shells. They also check hosted-only
actions, movable action versions, missing commands, Docker access, and
hard-coded GitHub-hosted paths.

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

## Deploy

Publish `dist/site/` to the static host. Keep the supplied
`staticwebapp.config.json` with the build output. It preserves the SPA routes
and the styled 404 response. After deployment, check `/?demo=1`, `/privacy`,
`/terms`, and an unknown URL.

## Privacy and security

The CLI includes no telemetry or network client code. Repository contents stay
on the machine where the command runs. The site has no accounts, analytics,
third-party scripts, cookies, or browser storage.

## License

MIT. See [LICENSE](LICENSE).
