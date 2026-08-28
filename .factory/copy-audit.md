# Copy audit — polish round 2

Reviewed: 28 August 2026. Counts treat commands, paths, hyphenated terms, and
code identifiers as one word. Interface fragments are included. No sentence
exceeds 22 words. The banned-word scan found no matches.

## Landing copy

| Copy | Words | Result |
| --- | ---: | --- |
| Action Parity Probe | 3 | Wordmark; pass |
| Runner migration check | 3 | Label; pass |
| Check workflow differences before changing CI runners | 7 | H1; pass |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Pass |
| Try it with sample data | 5 | Action; pass |
| Open the sample report. | 4 | Pass |
| No workflow steps run | 4 | Fact; pass |
| No accounts or telemetry | 4 | Fact; pass |
| Free and open source | 4 | Fact; pass |
| Runner racks line a night market under connected parity signs. | 10 | Image alt; pass |
| Each sign represents one sample workflow requirement. | 7 | Pass |
| Find incompatible steps before switching runners | 6 | H2; pass |
| Watch the real CLI check the bundled workflow. | 8 | Pass |
| Terminal recording of Action Parity Probe checking the bundled sample workflow. | 10 | Image alt; pass |
| `action-parity-probe demo` prints the result and its temporary Markdown report path. | 11 | Pass |
| How the check works | 4 | H2; pass |
| Point at a repository | 4 | H3; pass |
| The CLI reads YAML files under `.github/workflows`. | 7 | Pass |
| Choose a runner profile | 4 | H3; pass |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | Pass |
| Share the compatibility report | 4 | H3; pass |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | Pass |
| Start for real | 3 | Label; pass |
| Run the check on your repository | 6 | H2; pass |
| Install the CLI. | 3 | Pass |
| Then choose a versioned target profile. | 6 | Pass |
| Copy install command | 3 | Action; pass |
| A readiness report, not another runner | 6 | H2; pass |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | Pass |
| Static findings show declared risks. | 5 | Pass |
| Observed findings show local probe failures. | 6 | Pass |
| Read the privacy boundary | 4 | Link; pass |
| Check workflow differences before changing CI runners. | 7 | Footer; pass |
| Built by Param Factory · v0.1.0 | 5 | Footer label; pass |

## README copy

| Copy | Words | Result |
| --- | ---: | --- |
| Check a GitHub Actions workflow before changing runners. | 8 | Pass |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Pass |
| It inventories workflow requirements and compares them with a versioned runner profile. | 11 | Pass |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 13 | Pass |
| It never runs workflow steps. | 5 | Pass |
| The command copies a sample repository to a temporary directory. | 10 | Pass |
| It checks the bundled `act` profile. | 6 | Pass |
| It saves a Markdown report and prints the path. | 9 | Pass |
| Nothing is written to your repository. | 6 | Pass |
| Open the same sample report at action-parity-probe.sociobot.in/?demo=1. | 8 | Pass |
| The landing page includes a self-hosted recording generated from the real demo command. | 13 | Pass |
| Human-readable report. | 2 | Code comment; pass |
| Exit 1 means a nonportable requirement was found. | 8 | Code comment; pass |
| Machine-readable report for CI. | 4 | Code comment; pass |
| Check the current host without running workflow steps. | 8 | Code comment; pass |
| List bundled, versioned profiles. | 4 | Code comment; pass |
| The probe checks declared commands and shells on the current host. | 11 | Pass |
| It also reports filesystem case behavior and Docker socket access. | 10 | Pass |
| It does not execute workflow files, actions, or step scripts. | 10 | Pass |
| `terminal`: compact report for people. | 5 | List item; pass |
| `json`: structured output for scripts. | 5 | List item; pass |
| `markdown`: a report you can attach to a review. | 8 | List item; pass |
| `sarif`: findings for code-scanning tools. | 5 | List item; pass |
| Exit `0` means portable or warnings only. | 7 | Pass |
| Exit `1` means a nonportable requirement. | 6 | Pass |
| Exit `2` means invalid input or usage. | 7 | Pass |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | Pass |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | Pass |
| Rules check runner labels, services, and job containers. | 8 | Pass |
| They check OpenID Connect (OIDC) permissions and unavailable shells. | 9 | Pass |
| They also check hosted-only actions, movable action versions, missing commands, Docker access, and hard-coded GitHub-hosted paths. | 15 | Pass |
| This is a readiness check. | 5 | Pass |
| It is not a CI runner, a workflow translator, or a guarantee that a workflow will pass. | 17 | Pass |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Pass |
| `npm run build` creates the static site at `dist/site/`. | 9 | Pass |
| Run only the Rust suite with `cargo test`. | 8 | Pass |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Pass |
| Publish `dist/site/` to the static host. | 6 | Pass |
| Keep the supplied `staticwebapp.config.json` with the build output. | 8 | Pass |
| It preserves the SPA routes and the styled 404 response. | 10 | Pass |
| After deployment, check `/?demo=1`, `/privacy`, `/terms`, and an unknown URL. | 8 | Pass |
| The CLI includes no telemetry or network client code. | 9 | Pass |
| Repository contents stay on the machine where the command runs. | 10 | Pass |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | Pass |
| MIT. | 1 | Pass |
| See LICENSE. | 2 | Pass |

## Terminology

| Concept | One term |
| --- | --- |
| GitHub Actions definition | workflow |
| Target capability definition | runner profile |
| Result document | report |
| Declarative mismatch | static finding |
| Host observation mismatch | observed finding |
| One-click input | sample data |
| Restricted host checking mode | sandbox probe |
