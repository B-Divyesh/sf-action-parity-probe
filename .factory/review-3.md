# Adversarial first-read review 3 — Action Parity Probe

Reviewed: 28 August 2026  
Live URL: <https://action-parity-probe.sociobot.in>  
Reviewed commit: `1025b16fe21357be08abad552200e6aa204faa7f`

## Verdict

**PASS.** This review found zero blocking or minor findings. The first screen
answers the job, audience, and first action on a 390 px phone and desktop;
the one-click demo is isolated and immediately useful; all 17 registered
claims passed from a clean clone; and the live site, routes, accessibility,
metadata, and prior repairs were independently checked.

## Cold first read

Fresh, storage-empty Chromium contexts opened the live home page without
scrolling at 390×844 and 1440×900. There were no console errors.

| Question | First-read answer | Exact first-screen evidence | Result |
| --- | --- | --- | --- |
| What does it do? | It checks a GitHub Actions workflow for differences before a team changes CI runners. | “Check workflow differences before changing CI runners” | Clear |
| For whom? | Platform teams comparing local or alternate runners before an outage forces a migration. | “For platform teams comparing local or alternate runners before an outage forces the move.” | Clear |
| What should I click first? | Open the sample report. | “Try it with sample data” and “Open the sample report.” | Clear |

The phone action was visible and measured 217×53 px. The three facts were
also visible: “No workflow steps run”, “No accounts or telemetry”, and “Free
and open source”. No first-read blocker was found.

## Copy audit

Counts treat commands, paths, hyphenated terms, and code identifiers as one
word. Literal terminal output is listed as an interface fragment rather than
prose. No sentence exceeds 22 words. The banned-word scan found no match for
leverage, seamless, effortless, robust, powerful, intuitive, reimagine,
supercharge, unlock, delightful, journey, ecosystem, or “AI-powered”. Terms
are consistent: *workflow*, *runner profile*, *report*, *static finding*,
*observed finding*, and *sample data*.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | Wordmark; clear |
| Demo | 1 | Navigation link; clear |
| Install | 1 | Navigation link; clear |
| Privacy | 1 | Navigation link; clear |
| Runner migration check | 3 | Context label; clear |
| Check workflow differences before changing CI runners | 7 | H1; verb first, clear |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Audience and situation; clear |
| Try it with sample data | 5 | Primary result-naming action |
| Open the sample report. | 4 | States click result |
| No workflow steps run | 4 | Registered fact |
| No accounts or telemetry | 4 | Registered fact |
| Free and open source | 4 | Registered fact |
| Runner racks line a night market under connected parity signs. | 10 | Useful image alt |
| Each sign represents one sample workflow requirement. | 7 | Art caption; clear |
| Find incompatible steps before switching runners | 6 | H2; clear out of context |
| Watch the real CLI check the bundled workflow. | 8 | Terminal-recording claim coverage |
| Terminal recording of Action Parity Probe checking the bundled sample workflow. | 10 | Useful image alt |
| `action-parity-probe demo` prints the result and its temporary Markdown report path. | 11 | Terminal-recording claim coverage |
| Read all 14 findings | 4 | Result-naming link |
| How the check works | 4 | H2; clear |
| Point at a repository | 4 | H3; verb first |
| The CLI reads YAML files under `.github/workflows`. | 7 | Static-inventory coverage |
| Choose a runner profile | 4 | H3; verb first |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | Versioned-profiles coverage |
| Share the compatibility report | 4 | H3; verb first |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | Report-formats coverage |
| Start for real | 3 | Install-section label, not a control |
| Run the check on your repository | 6 | H2; clear |
| Install the CLI. | 3 | Clear first real step |
| Then choose a versioned target profile. | 6 | Versioned-profiles coverage |
| Copy install command | 3 | Result-naming button |
| A readiness report, not another runner | 6 | H2; clear boundary |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | Clear limitation |
| Static findings show declared risks. | 5 | Clear distinction |
| Observed findings show local probe failures. | 6 | Observed-probes coverage |
| Read the privacy boundary | 4 | Result-naming link |
| Check workflow differences before changing CI runners. | 7 | Footer one-liner |
| Built by Param Factory · v0.1.0 | 5 | Footer build label |

Visible terminal values such as “NONPORTABLE”, “6 errors”, “8 warnings”,
`sample-repo / release.yml`, the command, and finding rows are literal sample
report fragments. They are not sentences, use no marketing language, and are
covered by the browser sample and terminal-recording claim tests.

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | H1; product name |
| Check a GitHub Actions workflow before changing runners. | 8 | Clear opening |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Audience clear |
| It inventories workflow requirements and compares them with a versioned runner profile. | 11 | Static-inventory coverage |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 13 | Clear safety boundary |
| It never runs workflow steps. | 5 | No-workflow-execution coverage |
| Install | 1 | H2; clear |
| Try the bundled demo | 4 | H2; clear |
| The command copies a sample repository to a temporary directory. | 10 | Demo-sandbox coverage |
| It checks the bundled `act` profile. | 6 | Demo-sandbox coverage |
| It saves a Markdown report and prints the path. | 9 | Demo-sandbox coverage |
| Nothing is written to your repository. | 6 | Recursive demo-sandbox coverage |
| Open the same sample report at action-parity-probe.sociobot.in/?demo=1. | 8 | Browser-CLI sample coverage |
| The landing page includes a self-hosted recording generated from the real demo command. | 13 | Terminal-recording coverage |
| Check a repository | 4 | H2; clear |
| Human-readable report. | 2 | Command comment; clear |
| Exit 1 means a nonportable requirement was found. | 8 | Exit-codes coverage |
| Machine-readable report for CI. | 4 | Command comment; clear |
| Check the current host without running workflow steps. | 8 | Command comment; clear |
| List bundled, versioned profiles. | 4 | Command comment; clear |
| The probe checks declared commands and shells on the current host. | 11 | Probe-scope coverage |
| It also reports filesystem case behavior and Docker socket access. | 10 | Probe-scope coverage |
| It does not execute workflow files, actions, or step scripts. | 10 | No-workflow-execution coverage |
| Output formats | 2 | H3; clear |
| `terminal`: compact report for people. | 5 | Report-formats coverage |
| `json`: structured output for scripts. | 5 | Report-formats coverage |
| `markdown`: a report you can attach to a review. | 8 | Report-formats coverage |
| `sarif`: findings for code-scanning tools. | 5 | Report-formats coverage |
| Exit `0` means portable or warnings only. | 7 | Exit-codes coverage |
| Exit `1` means a nonportable requirement. | 6 | Exit-codes coverage |
| Exit `2` means invalid input or usage. | 7 | Exit-codes coverage |
| What it checks | 4 | H2; clear |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | Static-inventory coverage |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | Versioned-profiles coverage |
| Rules check runner labels, services, and job containers. | 8 | Rule-coverage coverage |
| They check OpenID Connect (OIDC) permissions and unavailable shells. | 9 | Rule-coverage coverage |
| They also check hosted-only actions, movable action versions, missing commands, Docker access, and hard-coded GitHub-hosted paths. | 15 | Rule-coverage coverage |
| This is a readiness check. | 5 | Honest boundary |
| It is not a CI runner, a workflow translator, or a guarantee that a workflow will pass. | 17 | Honest boundary |
| Develop and verify | 3 | H2; clear |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Verified |
| `npm run build` creates the static site at `dist/site/`. | 9 | Verified |
| Run only the Rust suite with `cargo test`. | 8 | Instruction |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Instruction |
| Deploy | 1 | H2; clear |
| Publish `dist/site/` to the static host. | 6 | Instruction |
| Keep the supplied `staticwebapp.config.json` with the build output. | 8 | Instruction |
| It preserves the SPA routes and the styled 404 response. | 10 | Verified live |
| After deployment, check `/?demo=1`, `/privacy`, `/terms`, and an unknown URL. | 8 | Instruction |
| Privacy and security | 3 | H2; clear |
| The CLI includes no telemetry or network client code. | 9 | CLI-privacy coverage |
| Repository contents stay on the machine where the command runs. | 10 | Demo-sandbox coverage |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | Privacy claim coverage |
| License | 1 | H2; clear |
| MIT. | 1 | Free-open-source coverage |
| See LICENSE. | 2 | Clear link |

No rewrite is proposed because the audit found no copy flag. The README's raw
commands are instructions, not sentences; their associated comments appear
above.

## Demo and sandbox verification

- A fresh 390×844 context clicked “Try it with sample data” once and reached
  `/?demo=1`.
- Before scrolling, it showed the persistent “Demo — sample data, nothing is
  saved” banner, Reset demo, Install the CLI, `NONPORTABLE`, six errors, eight
  warnings, and `APP003 · Floating runner image can drift`.
- After setting the report scroll position to 250, Reset demo restored it to
  zero, changed the status to “Sample restored. Recording restarted.”, and
  applied the `reset-sign-on` recording animation.
- The fresh demo context and post-reset context had no cookies, localStorage,
  or sessionStorage entries. Its requests were all same-origin.
- `action-parity-probe demo` was run with a temporary directory as its current
  directory. It exited 0, created its report under a separate
  `/tmp/action-parity-probe-demo-*` directory, and left the invoking directory
  containing only the reviewer output file. The registered recursive snapshot
  test separately covers hidden paths, nested binary data, symlinks, modes,
  sizes, and modification times.
- No offline promise appears in the landing page, README, or claims registry;
  an offline interception test is therefore not applicable.

The browser report intentionally presents static sample findings; the real CLI
terminal recording identifies that static and observed findings are separate.
This matches the product boundary and avoids treating host observations as
portable facts.

## Registered claims

A clean clone at `/tmp/action-parity-probe-review3-clean-T9yTVn` received
`npm ci`. Each exact command named in `.factory/claims.json` passed, and a
subsequent full `npm test` passed (2 Rust unit tests, 6 Rust CLI tests, and 64
Playwright tests). `npm run build` also passed and produced `dist/site/`.

| Claim | Exact registered test | Result |
| --- | --- | --- |
| `static-inventory` | `npm test -- --grep @claim:static-inventory` | PASS |
| `no-workflow-execution` | `npm test -- --grep @claim:no-workflow-execution` | PASS |
| `observed-probes` | `npm test -- --grep @claim:observed-probes` | PASS |
| `report-formats` | `npm test -- --grep @claim:report-formats` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS |
| `versioned-profiles` | `npm test -- --grep @claim:versioned-profiles` | PASS |
| `browser-demo-entry` | `npm test -- --grep @claim:browser-demo-entry` | PASS |
| `browser-cli-sample` | `npm test -- --grep @claim:browser-cli-sample` | PASS |
| `terminal-recording` | `npm test -- --grep @claim:terminal-recording` | PASS |
| `demo-reset` | `npm test -- --grep @claim:demo-reset` | PASS |
| `exit-codes` | `npm test -- --grep @claim:exit-codes` | PASS |
| `probe-scope` | `npm test -- --grep @claim:probe-scope` | PASS |
| `rule-coverage` | `npm test -- --grep @claim:rule-coverage` | PASS |
| `site-privacy` | `npm test -- --grep @claim:site-privacy` | PASS |
| `no-accounts-or-telemetry` | `npm test -- --grep @claim:no-accounts-or-telemetry` | PASS |
| `cli-privacy` | `npm test -- --grep @claim:cli-privacy` | PASS |
| `free-open-source` | `npm test -- --grep @claim:free-open-source` | PASS |

The live landing and README were cross-checked sentence by sentence against
this registry. Every reliance-worthy product statement is covered, narrowed
to a tested scope, or is a direct instruction or limitation. No unlisted
claim was found.

## Earlier findings verification

I read `review-1.md`, `review-2.md`, `polish-1.md`, `polish-2.md`, and the
previous handoff, then verified each prior finding against both the live site
and current code/tests.

| Earlier finding | Live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | Mobile demo result and first finding end above the 844 px fold; `browser-demo-entry` asserts it. | Fixed |
| F-1-2 | The hero action is the direct sample-data action and has a one-click claim test. | Fixed |
| F-1-3 | The browser fixture is compared structurally with the real CLI sample. | Fixed |
| F-1-4 | No unsupported Rust-version statement remains. | Fixed |
| F-1-5 | No single-binary packaging promise remains. | Fixed |
| F-1-6 | Browser and CLI profile, summary, inventory, and findings are compared. | Fixed |
| F-1-7 | Exit 0, 1, and 2 have controlled fixtures. | Fixed |
| F-1-8 | Probe scope checks commands, shell, case behavior, Docker, and non-execution. | Fixed |
| F-1-9 | The separate temporary-directory claim for probes is absent. | Fixed |
| F-1-10 | Rule coverage asserts every named rule family. | Fixed |
| F-1-11 | CLI privacy copy is limited to the source/dependency assertion. | Fixed |
| F-1-12 | The four exact profile IDs and documented aliases are asserted. | Fixed |
| F-1-13 | `snapshotTree` recursively compares hidden/nested entries, bytes, types, targets, modes, sizes, and mtimes. | Fixed |
| F-1-14 | README introduction sentences are below 22 words. | Fixed |
| F-1-15 | README demo copy is split into short sentences. | Fixed |
| F-1-16 | Exit-code copy is split into three short sentences. | Fixed |
| F-1-17 | The explicit `--probe --sandbox` boundary replaces “safe”. | Fixed |
| F-1-18 | The command comment states that workflow steps do not run. | Fixed |
| F-1-19 | OIDC is expanded and the rule prose is split. | Fixed |
| F-1-20 | The heading is “Share the compatibility report.” | Fixed |
| F-1-21 | The demo exit action is “Install the CLI.” | Fixed |
| F-1-22 | JSON is described as structured output for scripts. | Fixed |
| F-1-23 | Markdown is described as a report to attach to a review. | Fixed |
| F-1-24 | The hero caption describes a sample workflow requirement. | Fixed |
| F-1-25 | The preview heading names incompatible steps. | Fixed |
| F-1-26 | The live HTTP 404 has canonical, OG, Twitter, favicon, and Apple metadata. | Fixed |
| F-1-27 | The 404 header contains Demo, Install, and Privacy. | Fixed |
| F-1-28 | README documents deployment, SPA routes, and the 404 check. | Fixed |
| F-2-1 | Reset changes scroll, status, and row animation; `demo-reset` asserts all three. | Fixed |
| F-2-2 | A self-hosted SVG recording is generated from `action-parity-probe demo`; its claim compares command and output. | Fixed |
| F-2-3 | The demo preservation test is now a recursive metadata snapshot. | Fixed |

## Structure, accessibility, and crawl

| Check | Confirmation |
| --- | --- |
| Titles and metadata | Home is “Action Parity Probe — check runner differences”; each route had one H1, description, canonical, OG/Twitter image, favicon, Apple icon, and `lang=en`. |
| Routes | `/`, `/demo`, `/privacy`, and `/terms` returned 200. An unknown route returned the styled HTTP 404 with a return-home action. |
| History and focus | Current route code uses History API, restores scroll on `popstate`, moves focus to the H1, and announces the route. The clean suite's history tests passed. |
| Links and shell | All collected internal and external product links returned 200; the expected 404 skip-link preserves the page's HTTP 404 status. Header/footer consistently contain Privacy and Terms. |
| Security and privacy | Live headers include CSP, `X-Content-Type-Options`, and Referrer-Policy. The live privacy check found no third-party request, cookie, or browser storage. |
| Accessibility | Live Axe scans on five routes at 390 and 1440 widths reported zero violations, including zero serious or critical violations. `scripts/verify-url.sh` passed live. |
| Identity | The dark night-market runner art, ticket-corner panels, neon inspection marks, self-hosted type, and restrained recording motion match the design thesis and are not a generic SaaS surface. |

## Missed leverage

No feature is missing from the brief's job. The CLI accepts a repository path,
ships a bundled demo, and exports terminal, JSON, Markdown, and SARIF reports.
An AI step would not improve the deterministic, evidence-oriented comparison
and would reduce auditability; no AI feature or provider key is present.

## What would make this perfect

Keep the claim registry, recursive demo-preservation assertion, and live
phone-first demo check in the release process. Re-run this full cold-context
review after any copy, routing, profile, or demo change.
