# Adversarial first-read review 5 — Action Parity Probe

Reviewed: 29 August 2026

Live URL: <https://action-parity-probe.sociobot.in>

Reviewed commit: `84135fe5959b4f72abde9ba85533b99094a6b1e3`

## Verdict

**PASS.** This review found zero blocking or minor findings. The cold first
screen answers what the product does, who it serves, and what to click. The
one-click demo immediately shows a realistic result without touching seeded
real storage. All 19 registered claim commands passed independently from a
clean clone. The full suite, build, live route crawl, metadata, history,
privacy, accessibility, and every earlier finding also passed.

## Cold first read

Fresh Chromium contexts opened the live home page without scrolling at
390×844 and 1440×900. Both contexts had empty cookies and storage and produced
no console or page errors.

| Question | First-read answer | Exact first-screen evidence | Result |
| --- | --- | --- | --- |
| What does it do? | It checks a workflow for differences before a team changes CI runners. | “Check workflow differences before changing CI runners” | Clear |
| For whom? | Platform teams comparing local or alternate runners before an outage forces a move. | “For platform teams comparing local or alternate runners before an outage forces the move.” | Clear |
| What should I click first? | Open the sample report. | “Try it with sample data” and “Open the sample report.” | Clear |

At 390 px, the primary action was fully visible at 217×52.8 px. The three
facts were also inside the first viewport. The desktop first screen showed the
product-specific runner-market art and its factual sample caption.

## Findings

None.

## Copy audit

Counts use whitespace-separated words; punctuation-only separators are not
words. Paths, URLs, code identifiers, and hyphenated terms are single tokens.
Interface fragments and headings are included so vague labels and
buttons cannot escape the audit. Literal commands and generated report values
are data, not sentences; their explanatory labels, alt text, and captions are
included. No item exceeds 22 words. No banned marketing word, inconsistent
term, unexplained marketing adjective, metaphor heading, or vague action was
found.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Direct action |
| Action Parity Probe | 3 | Wordmark |
| Demo | 1 | Navigation destination |
| Install | 1 | Navigation destination |
| Privacy | 1 | Navigation destination |
| Runner migration check | 3 | Direct context label |
| Check workflow differences before changing CI runners | 7 | H1; names the job |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Names the audience and situation |
| Try it with sample data | 5 | Result-naming primary action |
| Open the sample report. | 4 | States the click result |
| No workflow steps run | 4 | `no-workflow-execution` |
| No accounts or telemetry | 4 | `no-accounts-or-telemetry` |
| Free and open source | 4 | `free-open-source` |
| Runner racks line a night market under connected parity signs. | 10 | Descriptive image alt |
| Sample workflow: `release.yml` checked against the `act` profile. | 8 | Factual caption; `browser-cli-sample` |
| CLI demo | 2 | Direct section label |
| Find incompatible steps before switching runners | 6 | H2; names the section |
| Watch the real CLI check the bundled workflow. | 8 | `terminal-recording` |
| Terminal recording of Action Parity Probe checking the bundled sample workflow. | 11 | Descriptive image alt |
| `action-parity-probe demo` prints the result and its temporary Markdown report path. | 11 | `terminal-recording` |
| How the check works | 4 | H2; names the section |
| Point at a repository | 4 | H3; verb first |
| The CLI reads YAML files under `.github/workflows`. | 7 | `static-inventory` and `browser-cli-sample` |
| Choose a runner profile | 4 | H3; verb first |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | `versioned-profiles` |
| Share the compatibility report | 4 | H3; verb first |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | `report-formats` |
| Run the check on your repository | 6 | H2; names the section |
| Install the CLI. | 3 | Direct instruction |
| Then choose a versioned target profile. | 6 | `versioned-profiles` |
| Copy install command | 3 | Result-naming button |
| Limits | 1 | Direct section label |
| A readiness report, not another runner | 6 | H2; names the boundary |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | `no-workflow-execution` and `read-only-check` |
| Static findings show declared risks. | 5 | `rule-coverage` |
| Observed findings show local probe failures. | 6 | `observed-probes` |
| Read the privacy boundary | 4 | Result-naming link |
| Check workflow differences before changing CI runners. | 7 | Footer summary |
| Privacy | 1 | Footer destination |
| Terms | 1 | Footer destination |
| Source (external) | 2 | Footer destination and external notice |
| Built by Param Factory · v0.1.0 | 5 | Build label |

The landing page's generated terminal image contains the real command and
report output. Its alt text and caption explain its purpose without requiring
the visitor to read text from the image.

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | H1; product name |
| Check a GitHub Actions workflow before changing runners. | 8 | Clear opening |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Names the audience |
| It inventories workflow requirements and compares them with a versioned runner profile. | 12 | `static-inventory` |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 14 | `observed-probes` and `probe-scope` |
| It never runs workflow steps. | 5 | `no-workflow-execution` |
| Install | 1 | H2; direct section name |
| Try the bundled demo | 4 | H2; direct section name |
| The command copies a sample repository to a temporary directory. | 10 | `demo-sandbox` |
| It checks the bundled `act` profile. | 6 | `demo-sandbox` |
| It saves a Markdown report and prints the path. | 9 | `demo-sandbox` |
| Nothing is written to your repository. | 6 | `demo-sandbox` |
| Open the same sample report at action-parity-probe.sociobot.in/?demo=1. | 7 | `browser-cli-sample` |
| The landing page includes a self-hosted recording generated from the real demo command. | 13 | `terminal-recording` |
| Check a repository | 3 | H2; direct section name |
| Human-readable report. | 2 | Command comment |
| Exit 1 means a nonportable requirement was found. | 8 | Command comment; `exit-codes` |
| Machine-readable report for CI. | 4 | Command comment |
| Check the current host without running workflow steps. | 8 | Command comment; `probe-scope` |
| List bundled, versioned profiles. | 4 | Command comment; `versioned-profiles` |
| The probe checks declared commands and shells on the current host. | 11 | `probe-scope` |
| It also reports filesystem case behavior and Docker socket access. | 10 | `probe-scope` |
| It does not execute workflow files, actions, or step scripts. | 10 | `no-workflow-execution` |
| Output formats | 2 | H3; direct section name |
| `terminal`: compact report for people. | 5 | `report-formats` |
| `json`: structured output for scripts. | 5 | `report-formats` |
| `markdown`: a report you can attach to a review. | 9 | `report-formats` |
| `sarif`: findings for code-scanning tools. | 5 | `report-formats` |
| Exit `0` means portable or warnings only. | 7 | `exit-codes` |
| Exit `1` means a nonportable requirement. | 6 | `exit-codes` |
| Exit `2` means invalid input or usage. | 7 | `exit-codes` |
| What it checks | 3 | H2; direct section name |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | `static-inventory` |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | `versioned-profiles` |
| Rules check runner labels, services, and job containers. | 8 | `rule-coverage` |
| They check OpenID Connect (OIDC) permissions and unavailable shells. | 9 | `rule-coverage` |
| They also check hosted-only actions, movable action versions, missing commands, Docker access, and hard-coded GitHub-hosted paths. | 16 | `rule-coverage` |
| This is a readiness check. | 5 | Clear scope |
| It is not a CI runner. | 6 | Clear limitation |
| It does not translate or change workflow files. | 8 | `read-only-check` |
| It does not guarantee that a workflow will pass. | 9 | Clear limitation |
| Develop and verify | 3 | H2; direct section name |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Developer command; verified in this review |
| `npm run build` creates the static site at `dist/site/`. | 9 | Developer command; verified in this review |
| Run only the Rust suite with `cargo test`. | 8 | Direct instruction |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Direct instruction |
| Deploy | 1 | H2; direct section name |
| Publish `dist/site/` to the static host. | 6 | Direct instruction |
| Keep the supplied `staticwebapp.config.json` with the build output. | 8 | Direct instruction |
| It serves the product routes and a styled 404 page. | 10 | `static-routing` |
| After deployment, check `/?demo=1`, `/privacy`, `/terms`, and an unknown URL. | 10 | Direct verification instruction |
| Privacy and security | 3 | H2; direct section name |
| The CLI includes no telemetry or network client code. | 9 | `cli-privacy` |
| Repository contents stay on the machine where the command runs. | 10 | `cli-privacy` and `read-only-check` |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | `site-privacy` and `no-accounts-or-telemetry` |
| License | 1 | H2; direct section name |
| MIT. | 1 | `free-open-source` |
| See LICENSE. | 2 | Direct documentation link |

### Terminology

| Concept | One term used |
| --- | --- |
| GitHub Actions definition | workflow |
| Target capability definition | runner profile |
| Result document | report |
| Declarative mismatch | static finding |
| Host observation mismatch | observed finding |
| One-click input | sample data |
| Restricted host check | sandbox probe |

All actions name their result: “Try it with sample data,” “Copy install
command,” “Reset demo,” “Install the CLI,” and “Return home.”

## Demo and sandbox verification

- One click from the live home page reached `/?demo=1`.
- The first 390×844 demo viewport showed the persistent banner, `NONPORTABLE`,
  six errors, eight warnings, and `APP003 · Floating runner image can drift`.
  The sample result ended at y=461.4 px, well above the 844 px fold.
- Reset moved the scrollable report from 1,025 px to zero, announced “Sample
  restored. Recording restarted.”, and restarted `reset-sign-on`.
- A seeded `real:review-marker=keep` local-storage entry was unchanged after
  demo entry and Reset. The demo created no local/session entry, IndexedDB
  database, Cache Storage key, service-worker registration, or cookie.
- The complete live request log contained only
  `https://action-parity-probe.sociobot.in`.
- The CLI demo ran from a fresh temporary directory. It wrote its report under
  a separate `/tmp/action-parity-probe-demo-*` directory and did not add a
  product file to the invoking directory.
- No offline claim appears in the site, README, or claim registry, so an
  offline behavior assertion is not applicable.

## Registered claims

A clean clone at `/tmp/action-parity-probe-review5-clean-1n4lLB/repo` received
`npm ci`. Every exact `test` command in `.factory/claims.json` ran separately
and exited successfully.

| Claim | Exact registered test | Result |
| --- | --- | --- |
| `static-inventory` | `npm test -- --grep @claim:static-inventory` | PASS |
| `no-workflow-execution` | `npm test -- --grep @claim:no-workflow-execution` | PASS |
| `read-only-check` | `npm test -- --grep @claim:read-only-check` | PASS |
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
| `static-routing` | `npm test -- --grep @claim:static-routing` | PASS |

The subsequent clean-clone `npm test` passed 2 Rust unit tests, 6 Rust CLI
tests, and 65 Playwright tests; 3 viewport-opposite tests were intentionally
skipped. `npm run build` produced `dist/site/`. The JavaScript bundle was
19.03 kB raw and 5.87 kB gzip. No public product claim on the landing,
README, demo, privacy, or terms route lacked registry coverage. The two README
developer-command descriptions were also directly verified by the full suite
and build.

## Earlier findings verification

Every `.factory/review-*.md`, `.factory/polish-*.md`, and the prior handoff was
read. Each earlier finding was rechecked against the live artifact and current
source or its tagged test. The live JS and CSS SHA-256 values match the clean
clone build, so the source confirmations describe the deployed artifact.

| Earlier finding | Current live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | The mobile sample result and first finding end at y=461.4 px; `browser-demo-entry` asserts the fold. | Fixed |
| F-1-2 | The hero sample action opens `?demo=1` in one click under a tagged claim. | Fixed |
| F-1-3 | `browser-cli-sample` compares real CLI output with the browser fixture. | Fixed |
| F-1-4 | No minimum-Rust-version statement is present. | Fixed |
| F-1-5 | No single-binary packaging promise is present. | Fixed |
| F-1-6 | Profile, summary, inventory, and findings are compared between CLI and browser sample. | Fixed |
| F-1-7 | `exit-codes` verifies 0, 1, and 2 with controlled inputs. | Fixed |
| F-1-8 | `probe-scope` verifies commands, shells, case behavior, Docker, and non-execution. | Fixed |
| F-1-9 | No separate host-probe temporary-directory promise remains. | Fixed |
| F-1-10 | `rule-coverage` asserts every rule family named in the README. | Fixed |
| F-1-11 | CLI privacy copy remains limited to the tested absence of network and telemetry client code. | Fixed |
| F-1-12 | `versioned-profiles` asserts the exact profile IDs and aliases. | Fixed |
| F-1-13 | `snapshotTree` recursively compares paths, bytes, types, links, modes, sizes, and mtimes. | Fixed |
| F-1-14 | README introduction sentences remain below 22 words. | Fixed |
| F-1-15 | README demo copy remains split into short sentences. | Fixed |
| F-1-16 | Exit-code copy remains three short sentences. | Fixed |
| F-1-17 | The README names the explicit `--probe --sandbox` boundary. | Fixed |
| F-1-18 | The command comment states that workflow steps do not run. | Fixed |
| F-1-19 | OpenID Connect is expanded and rule copy remains split. | Fixed |
| F-1-20 | The heading remains “Share the compatibility report.” | Fixed |
| F-1-21 | The demo exit action remains “Install the CLI.” | Fixed |
| F-1-22 | JSON remains described as structured output for scripts. | Fixed |
| F-1-23 | Markdown remains described as a report to attach to a review. | Fixed |
| F-1-24 | The caption names `release.yml` and the `act` profile without visual metaphor. | Fixed |
| F-1-25 | The preview heading names incompatible steps and runner switching. | Fixed |
| F-1-26 | The live HTTP 404 has canonical, OG, Twitter, favicon, and Apple metadata. | Fixed |
| F-1-27 | The 404 header contains Demo, Install, and Privacy. | Fixed |
| F-1-28 | README documents `dist/site/`, route checks, and the styled 404. | Fixed |
| F-2-1 | Reset restores scroll, announces the result, and restarts row animation live. | Fixed |
| F-2-2 | The self-hosted SVG recording is generated from the real CLI demo. | Fixed |
| F-2-3 | Demo preservation uses the complete recursive metadata snapshot. | Fixed |
| F-4-1 | `read-only-check` covers normal and sandbox-probe checks without file changes. | Fixed |
| F-4-2 | `static-routing` serves three deep routes and a styled HTTP 404 through the host emulator. | Fixed |
| F-4-3 | Numeric overlines and metaphor copy remain absent; direct “CLI demo” and “Limits” labels remain. | Fixed |
| F-4-4 | Both SPA fallback code and the standalone HTTP 404 say “Page not found.” | Fixed |

No earlier finding is unfixed, half-fixed, or regressed.

## Structure, accessibility, and crawl

| Check | Result |
| --- | --- |
| Titles | PASS: home follows “Product — what it does”; Demo, Privacy, Terms, and 404 use route-first titles below 60 characters. |
| Headings and landmarks | PASS: every route has one H1, one main landmark, ordered headings, `lang=en`, header, nav, and footer. |
| Metadata | PASS: every route has a description, canonical, OG/Twitter fields, 1200×630 product art, SVG favicon, Apple icon, and matching theme color. |
| Routes and 404 | PASS: `/`, `/demo`, `/privacy`, and `/terms` return 200; an unknown route returns the designed document with HTTP 404. |
| History and focus | PASS: route changes focus and announce the new H1; back restores the route and saved scroll position. |
| Crawl | PASS: every internal route/anchor, source link, and public issue-tracker link resolved successfully. |
| Shell consistency | PASS: normal and 404 routes share the wordmark, Demo, Install, Privacy, footer Privacy/Terms, source, build label, and skip link. |
| Security and privacy | PASS: live CSP, HSTS, `X-Content-Type-Options`, Referrer-Policy, and Permissions-Policy are present; requests remain same-origin. |
| Accessibility | PASS: live axe scans found zero violations on five routes at 390×844 and 1440×900. All mobile targets tested by the suite meet 44 px. |
| Motion | PASS: reduced motion collapses animation duration to 0.00001 seconds and nothing loops or flashes. |
| Visual identity | PASS: runner-market art, clipped ticket surfaces, neon status marks, local type, and single report-row reveal match `.factory/design.md`; this is not a generic SaaS template. |
| Payload | PASS: first-load JavaScript is 5.87 kB gzip, below the 150 kB static-product limit. |

`scripts/verify-url.sh` passed live `/`, `/demo`, `/privacy`, and `/terms`.
The production assets and clean build matched exactly:

- JS SHA-256: `6609a7e57f333ded18ba620a296f032f55bf717842c4f4738e20319ea1101bdb`
- CSS SHA-256: `755e01f3c5bf59c7c3938ba3c806368e9481a50a3a45a17eb7eb091835751ffc`

## Missed leverage

No obvious feature is missing from the brief. A repository path is the import,
and terminal, JSON, Markdown, and SARIF cover export and review workflows. The
comparison is deterministic and evidence-oriented. Adding an AI explanation
step would introduce uncertainty without completing a missing job. No AI
feature, provider key, sync promise, or decorative AI surface is present.

## What would make this perfect

Nothing remains to change from this review. Keep the clean-clone claim run,
phone-first demo check, recursive read-only assertions, and live route crawl in
the release process so the current zero-finding state does not regress.
