# Adversarial first-read review 4 — Action Parity Probe

Reviewed: 29 August 2026

Live URL: <https://action-parity-probe.sociobot.in>

Reviewed commit: `36b933c0d906ccf1477cdf36109074b4915d89a3`

## Verdict

**FAIL.** The first screen is clear, the one-click demo works, all 17
registered claim commands pass from a clean clone, and the live route and
accessibility checks pass. Two public behavior claims remain outside
`.factory/claims.json`. The landing page also retains decorative, metaphor-led
copy, including numbered labels that do not name their sections. PASS requires
zero findings and no unlisted claim.

## Cold first read

Fresh, storage-empty Chromium contexts opened the live home page without
scrolling at 390×844 and 1440×900. Neither context produced a console error.

| Question | First-read answer | Exact first-screen evidence | Result |
| --- | --- | --- | --- |
| What does it do? | It checks a GitHub Actions workflow for differences before changing CI runners. | “Check workflow differences before changing CI runners” | Clear |
| For whom? | Platform teams comparing local or alternate runners before an outage forces a move. | “For platform teams comparing local or alternate runners before an outage forces the move.” | Clear |
| What should I click first? | Open the sample report. | “Try it with sample data” and “Open the sample report.” | Clear |

At 390 px, the action measured 217×53 px. All three facts were inside the
initial viewport: “No workflow steps run,” “No accounts or telemetry,” and
“Free and open source.” The desktop viewport also showed the product-specific
night-market art. The three mandatory questions are answered, so there is no
first-screen blocking finding.

## Findings

### Blocking

#### F-4-1 — The no-translation behavior is an unlisted claim

- **Quote/location:** Landing boundary, `site/src/main.js:151`: “It does not
  execute actions, translate YAML, or promise a passing build.” README lines
  79–80 repeats the behavior as “It is not a CI runner, a workflow translator,
  or a guarantee that a workflow will pass.”
- **Why this fails:** `no-workflow-execution` proves that a workflow step does
  not create its marker. It does not prove that `check` leaves workflow YAML
  unchanged. `demo-sandbox` recursively snapshots the invoking directory only
  for the separate `demo` command. No claim entry or tagged test owns the
  public statement that normal analysis does not translate or modify YAML.
- **Concrete fix:** add a `read-only-check` entry to `.factory/claims.json`.
  Its tagged test must recursively snapshot a repository, run representative
  `check` commands including `--probe --sandbox`, and compare paths, bytes,
  types, links, modes, sizes, and modification times. Alternatively, remove
  “translate YAML” and “workflow translator” from public copy.

#### F-4-2 — The documented SPA/404 behavior is an unlisted claim

- **Quote/location:** `README.md:98-99`: “It preserves the SPA routes and the
  styled 404 response.”
- **Why this fails:** the sentence promises observable deploy behavior, but
  `.factory/claims.json` contains no routing claim. The untagged quality test
  checks configuration text, and this review confirmed the live behavior, but
  the supplied claims contract requires every public claim to have a listed,
  tagged sandbox test.
- **Concrete fix:** add a `static-routing` claim with a tagged test that serves
  the built artifact under the supplied host configuration and asserts that
  `/demo`, `/privacy`, and `/terms` deep-link correctly while an unknown URL
  returns the styled document with HTTP 404. The smaller copy-only fix is to
  remove the assertion and retain the direct instruction: “Deploy with the
  supplied `staticwebapp.config.json`.”

### Minor

#### F-4-3 — Decorative labels and the art caption do not help the visitor use the tool

- **Quote/location:** Landing page and `site/src/main.js:107,112,124,135,148`:
  “01,” “Each sign represents one sample workflow requirement,” “LIVE / 02,”
  “ROUTE / 03,” “Start for real,” and “BOUNDARY / 04.”
- **Why this fails:** the sequence is decorative rather than procedural. The
  labels do not name their sections, and the caption asks the visitor to decode
  the night-market metaphor. The adjacent headings already supply the useful
  structure.
- **Concrete fix:** remove the numeric overlines and “Start for real.” Replace
  the caption with tested sample information, for example: “Sample workflow:
  `release.yml` checked against the `act` profile.” If labels are retained,
  name the sections “CLI demo,” “How it works,” “Install,” and “Limits.”

#### F-4-4 — The 404 headline describes a missing runner label, not a missing page

- **Quote/location:** Live unknown route and `site/public/404.html`: “Route
  disconnected” and H1 “This runner label does not exist.”
- **Why this fails:** an invalid site URL does not imply that a runner label is
  missing. The metaphor makes the error less precise for a visitor who needs
  to recover from a bad link.
- **Concrete fix:** use H1 “Page not found,” remove “Route disconnected,” and
  keep the direct recovery copy: “Check the address or return to Action Parity
  Probe.”

## Copy audit

Counts treat a command, path, URL, and hyphenated term as one word. Punctuation
and decorative symbols are not words. Raw command lines and literal terminal
output are interface data rather than sentences; their labels and explanatory
copy are included. No sentence exceeds 22 words and no banned marketing word
appears. The only copy flags are F-4-3 and F-4-4; F-4-1 and F-4-2 are claim
registration failures rather than length or jargon failures.

### Landing page text

| Copy | Words | Check |
| --- | ---: | --- |
| Skip to main content | 4 | Skip action; clear |
| Action Parity Probe | 3 | Wordmark; clear |
| Demo | 1 | Navigation link; clear |
| Install | 1 | Navigation link; clear |
| Privacy | 1 | Navigation link; clear |
| Runner migration check | 3 | Context label; clear |
| Check workflow differences before changing CI runners | 7 | H1; clear |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Audience and situation; clear |
| Try it with sample data | 5 | Result-naming action; clear |
| Open the sample report. | 4 | Click result; clear |
| No workflow steps run | 4 | Registered claim |
| No accounts or telemetry | 4 | Registered claim |
| Free and open source | 4 | Registered claim |
| Runner racks line a night market under connected parity signs. | 10 | Image alt; describes the art |
| 01 | 1 | Decorative; F-4-3 |
| Each sign represents one sample workflow requirement. | 7 | Metaphor; F-4-3 |
| LIVE / 02 | 2 | Decorative label; F-4-3 |
| Find incompatible steps before switching runners | 6 | H2; clear |
| Watch the real CLI check the bundled workflow. | 8 | Registered terminal-recording claim |
| Terminal recording of Action Parity Probe checking the bundled sample workflow. | 10 | Image alt; clear |
| `action-parity-probe demo` prints the result and its temporary Markdown report path. | 11 | Registered terminal-recording claim |
| ROUTE / 03 | 2 | Decorative label; F-4-3 |
| How the check works | 4 | H2; clear |
| Point at a repository | 4 | H3; clear |
| The CLI reads YAML files under `.github/workflows`. | 7 | Registered inventory claim |
| Choose a runner profile | 4 | H3; clear |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | Registered profile claim |
| Share the compatibility report | 4 | H3; clear |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | Registered format claim |
| Start for real | 3 | Decorative label; F-4-3 |
| Run the check on your repository | 6 | H2; clear |
| Install the CLI. | 3 | Clear instruction |
| Then choose a versioned target profile. | 6 | Registered profile claim |
| Copy install command | 3 | Result-naming button |
| BOUNDARY / 04 | 2 | Decorative label; F-4-3 |
| A readiness report, not another runner | 6 | H2; clear |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | F-4-1 |
| Static findings show declared risks. | 5 | Clear distinction |
| Observed findings show local probe failures. | 6 | Registered observed-probes claim |
| Read the privacy boundary | 4 | Result-naming link |
| Check workflow differences before changing CI runners. | 7 | Footer summary; clear |
| Privacy | 1 | Footer link; clear |
| Terms | 1 | Footer link; clear |
| Source (external) | 2 | Footer link; clear |
| Built by Param Factory · v0.1.0 | 5 | Footer build label; clear |

The sample terminal values, commands, status, counts, and finding rows are
literal report data. They are covered by the browser-sample and recording
claims. Button labels “Try it with sample data” and “Copy install command” name
their result; no vague `Submit`, `Go`, or `Continue` control appears.

### README text

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | H1; product name |
| Check a GitHub Actions workflow before changing runners. | 8 | Clear opening |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Audience is clear |
| It inventories workflow requirements and compares them with a versioned runner profile. | 11 | Registered inventory claim |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 13 | Clear boundary |
| It never runs workflow steps. | 5 | Registered no-execution claim |
| Install | 1 | H2; clear |
| Try the bundled demo | 4 | H2; clear |
| The command copies a sample repository to a temporary directory. | 10 | Registered demo-sandbox claim |
| It checks the bundled `act` profile. | 6 | Registered demo-sandbox claim |
| It saves a Markdown report and prints the path. | 9 | Registered demo-sandbox claim |
| Nothing is written to your repository. | 6 | Registered demo-sandbox claim |
| Open the same sample report at `action-parity-probe.sociobot.in/?demo=1`. | 7 | Registered browser-sample claim |
| The landing page includes a self-hosted recording generated from the real demo command. | 13 | Registered recording claim |
| Check a repository | 4 | H2; clear |
| Human-readable report. | 2 | Command comment; clear |
| Exit 1 means a nonportable requirement was found. | 8 | Registered exit-code claim |
| Machine-readable report for CI. | 4 | Command comment; clear |
| Check the current host without running workflow steps. | 8 | Command comment; clear |
| List bundled, versioned profiles. | 4 | Command comment; clear |
| The probe checks declared commands and shells on the current host. | 11 | Registered probe-scope claim |
| It also reports filesystem case behavior and Docker socket access. | 10 | Registered probe-scope claim |
| It does not execute workflow files, actions, or step scripts. | 10 | Registered no-execution claim |
| Output formats | 2 | H3; clear |
| `terminal`: compact report for people. | 5 | Registered report-format claim |
| `json`: structured output for scripts. | 5 | Registered report-format claim |
| `markdown`: a report you can attach to a review. | 8 | Registered report-format claim |
| `sarif`: findings for code-scanning tools. | 5 | Registered report-format claim |
| Exit `0` means portable or warnings only. | 7 | Registered exit-code claim |
| Exit `1` means a nonportable requirement. | 6 | Registered exit-code claim |
| Exit `2` means invalid input or usage. | 7 | Registered exit-code claim |
| What it checks | 4 | H2; clear |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | Registered inventory claim |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | Registered profile claim |
| Rules check runner labels, services, and job containers. | 8 | Registered rule-coverage claim |
| They check OpenID Connect (OIDC) permissions and unavailable shells. | 9 | Registered rule-coverage claim |
| They also check hosted-only actions, movable action versions, missing commands, Docker access, and hard-coded GitHub-hosted paths. | 15 | Registered rule-coverage claim |
| This is a readiness check. | 5 | Clear scope |
| It is not a CI runner, a workflow translator, or a guarantee that a workflow will pass. | 17 | F-4-1 |
| Develop and verify | 3 | H2; clear |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Verified developer instruction |
| `npm run build` creates the static site at `dist/site/`. | 9 | Verified developer instruction |
| Run only the Rust suite with `cargo test`. | 8 | Instruction |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Instruction |
| Deploy | 1 | H2; clear |
| Publish `dist/site/` to the static host. | 6 | Instruction |
| Keep the supplied `staticwebapp.config.json` with the build output. | 8 | Instruction |
| It preserves the SPA routes and the styled 404 response. | 10 | F-4-2 |
| After deployment, check `/?demo=1`, `/privacy`, `/terms`, and an unknown URL. | 8 | Instruction |
| Privacy and security | 3 | H2; clear |
| The CLI includes no telemetry or network client code. | 9 | Registered CLI-privacy claim |
| Repository contents stay on the machine where the command runs. | 10 | Registered CLI-privacy claim |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | Registered privacy claims |
| License | 1 | H2; clear |
| MIT. | 1 | Registered license claim |
| See LICENSE. | 2 | Clear link |

Terminology is consistent: the copy uses *workflow*, *runner profile*,
*report*, *static finding*, *observed finding*, and *sample data* for the same
concepts throughout. “CI,” “YAML,” “SARIF,” and runner names are appropriate
technical terms for the named platform-team audience; OIDC is expanded on
first use in the README.

## Demo and sandbox verification

- A fresh 390×844 context clicked “Try it with sample data” once and reached
  `/?demo=1`.
- Without scrolling, the resulting screen showed “Demo — sample data, nothing
  is saved,” Reset demo, Install the CLI, `NONPORTABLE`, six errors, eight
  warnings, and `APP003 · Floating runner image can drift`.
- Reset demo restored the terminal scroll position and restarted the first row
  with the `reset-sign-on` animation. Its visible status changed to “Sample
  restored. Recording restarted.”
- A seeded `real:review-marker=keep` local-storage value survived demo entry
  and reset unchanged. The demo added no local-storage, session-storage, or
  cookie value.
- The complete browser request log contained only the product origin. No
  offline claim appears in the landing, README, or claim registry, so an
  offline behavior test is not applicable.
- The CLI demo ran from an empty temporary directory. It reported a distinct
  `/tmp/action-parity-probe-demo-*` report path and left the invoking directory
  empty.

## Registered claims

A clean clone at `/tmp/action-parity-probe-review4-clean-YuTctH/repo` received
`npm ci`. Every exact `test` command in `.factory/claims.json` was run
independently and passed.

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

The subsequent clean-clone `npm test` passed 2 Rust unit tests, 6 Rust CLI
tests, and 61 Playwright tests, with 3 intentional viewport skips. An explicit
`npm run build` passed and produced `dist/site/`; the JavaScript bundle was
19.25 kB raw and 5.94 kB gzip. No registered claim test failed. F-4-1 and
F-4-2 are unlisted claims, so the claim audit is still incomplete.

## Earlier findings verification

I read `review-1.md`, `review-2.md`, `review-3.md`, `polish-1.md`,
`polish-2.md`, and the prior handoff. Each earlier finding was checked against
the live site and current code or tests.

| Earlier finding | Live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | The mobile demo result and first real finding are above the 844 px fold; the live measurement and `browser-demo-entry` confirm it. | Fixed |
| F-1-2 | The hero action opens the browser demo in one click and has a tagged claim. | Fixed |
| F-1-3 | The generated browser fixture is still compared with real CLI output. | Fixed |
| F-1-4 | No minimum Rust-version statement appears. | Fixed |
| F-1-5 | No single-binary packaging promise appears. | Fixed |
| F-1-6 | `browser-cli-sample` compares profile, summary, inventory, and findings. | Fixed |
| F-1-7 | `exit-codes` still checks outcomes 0, 1, and 2. | Fixed |
| F-1-8 | `probe-scope` checks commands, shell, case behavior, Docker, and non-execution. | Fixed |
| F-1-9 | No separate temporary-directory claim remains for normal probes. | Fixed |
| F-1-10 | `rule-coverage` asserts every documented rule family. | Fixed |
| F-1-11 | CLI privacy copy remains limited to absence of network and telemetry client code, and its tagged source scan passes. | Fixed |
| F-1-12 | The exact four profile IDs and documented aliases remain asserted. | Fixed |
| F-1-13 | `snapshotTree` still checks hidden and nested entries, bytes, types, links, modes, sizes, and mtimes for the demo command. | Fixed |
| F-1-14 | README introduction sentences remain below 22 words. | Fixed |
| F-1-15 | README demo copy remains split into short sentences. | Fixed |
| F-1-16 | Exit-code copy remains split into three sentences. | Fixed |
| F-1-17 | The README still names the explicit `--probe --sandbox` boundary. | Fixed |
| F-1-18 | The host-check comment says workflow steps do not run. | Fixed |
| F-1-19 | OpenID Connect is expanded and the rule prose remains split. | Fixed |
| F-1-20 | The step heading remains “Share the compatibility report.” | Fixed |
| F-1-21 | The demo exit action remains “Install the CLI.” | Fixed |
| F-1-22 | JSON remains described as structured output for scripts. | Fixed |
| F-1-23 | Markdown remains described as a report to attach to a review. | Fixed |
| F-1-24 | The old “bright sign” sentence is gone; F-4-3 identifies the remaining metaphor in its replacement. | Fixed; new finding F-4-3 |
| F-1-25 | The preview heading remains “Find incompatible steps before switching runners.” | Fixed |
| F-1-26 | The live HTTP 404 has canonical, OG, Twitter, favicon, and Apple metadata. | Fixed |
| F-1-27 | The 404 header contains Demo, Install, and Privacy. | Fixed |
| F-1-28 | README retains deployment instructions; F-4-2 concerns the new claim-registry requirement, not the missing section. | Fixed; new finding F-4-2 |
| F-2-1 | Reset changes scroll position, visible status, and row animation; the tagged test passes. | Fixed |
| F-2-2 | The self-hosted SVG recording is generated from the real CLI demo and remains visible live. | Fixed |
| F-2-3 | The demo preservation test recursively snapshots the complete fixture tree and metadata. | Fixed |

No earlier finding is unfixed, half-fixed, or regressed. The round-four items
are new findings under the supplied zero-decorative-copy and complete-claim-
registry rules.

## Structure, accessibility, and crawl

| Check | Result |
| --- | --- |
| Titles | PASS: home follows “Product — what it does”; Demo, Privacy, Terms, and 404 use route-first titles, all below 60 characters. |
| Headings and landmarks | PASS: every checked route has one H1 and one main landmark; heading order is valid. F-4-4 concerns wording, not hierarchy. |
| Metadata | PASS: every route has a description, canonical, OG/Twitter data, product image, SVG favicon, Apple icon, `lang=en`, and matching theme color. |
| Routes | PASS: `/`, `/demo`, `/privacy`, and `/terms` return 200. An unknown route returns the designed document with HTTP 404. |
| History and focus | PASS: client navigation uses History API; route changes focus and announce the H1; back restores the prior route, focus, and a tested 600 px scroll position. |
| Crawl | PASS: all internal routes, anchors, the GitHub source, and public issue tracker resolve. No dead link was found. |
| Header and footer | PASS: normal and 404 routes share the wordmark, Demo, Install, Privacy, footer Privacy/Terms, source, version, and skip link. |
| Security and privacy | PASS: live headers include CSP, `X-Content-Type-Options`, Referrer-Policy, HSTS, and Permissions-Policy; the browser log is same-origin only. |
| Accessibility | PASS: Playwright Axe on five routes at 390×844 and 1440×900 found zero serious or critical violation. `scripts/verify-url.sh` passed live. |
| Visual identity | PASS: night-market runner art, clipped ticket surfaces, neon inspection marks, local type, and one-shot row motion match `.factory/design.md` and do not resemble a generic SaaS template. The reduced-motion media rule shortens all animation and transition durations. |

## Missed leverage

No additional feature is implied by the brief. A repository path is the
import, and terminal, JSON, Markdown, and SARIF cover export and review use.
Runner comparison is deterministic and evidence-oriented; an AI explanation
layer would add uncertainty rather than complete the job. No decorative AI
feature or embedded provider key is present.

## What would make this perfect

Register and test the two unlisted behavior claims or remove their public
assertions. Remove the numbered/decorative overlines, replace the art metaphor
with sample facts, and use a literal “Page not found” 404 heading. Then rerun
all 17 current claim commands plus the new claim tests, the full suite, and the
live phone-first crawl. At that point there would be nothing left in this
review.
