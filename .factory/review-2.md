# Adversarial first-read review 2 — Action Parity Probe

Reviewed: 28 August 2026
Live URL: <https://action-parity-probe.sociobot.in>
Candidate: `d9bb15fbcf3a651493240d6225b1db5e1c85d882`

## Verdict

**FAIL.** The cold landing page is clear, the mobile demo now puts a genuine
sample result in its first viewport, all 15 registered claim commands passed
from a clean clone, and the site has a distinct, accessible visual system.
Three blocking checks remain: Reset demo has no visible or data effect, the
CLI lacks the required self-hosted terminal recording, and the earlier
repository-preservation test remains only a shallow check. PASS requires zero
findings.

## Cold first read

Fresh, storage-empty Chromium contexts opened the home page without scrolling
at 390×844 and 1440×900. Neither context produced a console error or
third-party request.

| Question | First-read answer | Exact first-screen evidence | Result |
| --- | --- | --- | --- |
| What does it do? | It checks a GitHub Actions workflow for runner differences before a CI migration. | “Check workflow differences before changing CI runners” | Clear |
| For whom? | Platform teams comparing a local or alternate runner before an outage forces a move. | “For platform teams comparing local or alternate runners before an outage forces the move.” | Clear |
| What should I click first? | Try the sample report. | “Try it with sample data” and “Open the sample report.” | Clear |

At 390 px, the primary action measured 217×53 px and was fully visible. The
first desktop viewport additionally showed the product art and caption. No
first-read clarity blocker was found.

## Findings

### Blocking

#### F-2-1 — Reset demo has no observable reset effect

- **Quote/location:** Live `/demo` banner: “Reset demo”; implementation in
  `site/src/main.js` adds the class `replay` to `.terminal-shell`.
- **Evidence:** Before reset, the element class was `terminal-shell
  terminal-full`; after clicking it was `terminal-shell terminal-full replay`.
  The first row retained the same 33, 727, 324×86 bounding box and the same
  `sign-on` computed animation. `site/src/styles.css` contains no `.replay`
  selector, so adding the class cannot restart an animation. The live status
  announcement says “Demo reset. Sample data is unchanged.” although no
  observable reset happened.
- **Why this fails:** The required demo banner presents Reset demo as a working
  control. A visitor cannot verify that it did anything, and a future demo with
  editable state would make this a misleading promise.
- **Concrete fix:** Either remove Reset demo because this read-only report has
  no resettable state, or make it reset a real demo namespace and visibly
  restart the report (for example, force a keyed re-render or use a
  `.replay .terminal-row` animation rule). Add a tagged test that changes demo
  state or captures a restarted row animation, clicks Reset demo, and asserts
  the initial sample/report state and the observable reset result.

#### F-2-2 — The CLI demo lacks the required terminal recording of the real command

- **Quote/location:** Landing preview in `site/src/main.js:60-78`, headed
  “Find incompatible steps before switching runners.” It is HTML populated
  from `demo-report.json`; the repository has no self-hosted asciinema, SVG,
  or other terminal-recording asset.
- **Why this fails:** This is a CLI product. The demo contract requires a
  self-hosted terminal recording of the real binary doing its main job on the
  shipped sample, in addition to `action-parity-probe demo`. The current static
  report proves a useful result but does not show the command running, its
  sample input, or where the CLI writes the report.
- **Concrete fix:** Generate and ship a small self-hosted SVG/asciinema-style
  recording from `action-parity-probe demo` against `examples/sample-repo/`.
  Put it on the landing page with a plain caption naming the command and its
  temporary report path. Add a claim that compares the recording's shown
  command, profile, outcome, and report-path behavior with a fresh CLI demo.

#### F-2-3 — F-1-13 is only half-fixed: repository preservation is not tested recursively

- **Quote/location:** `tests/site/claims.spec.js`,
  `@claim:demo-sandbox`; README: “Nothing is written to your repository.”
- **Evidence:** The test creates only `sentinel.txt` at the repository root,
  compares `readdirSync(repository)`, and re-reads that one file. It does not
  create or snapshot a nested tree, hidden workflow files, contents below the
  root, or metadata. This does not implement F-1-13's requested full
  tree/content/metadata comparison.
- **Why this fails:** A CLI can leave an existing top-level name intact while
  changing a nested workflow or adding a file under an existing directory.
  The public no-write promise therefore has a passing but incomplete claim
  test.
- **Concrete fix:** Build a fixture repository with nested and hidden files,
  then snapshot every relative path, file bytes, type, and relevant metadata
  before `action-parity-probe demo`; compare the complete snapshot afterwards.
  Keep the temporary report-path assertion. This is a recurrence of **F-1-13**
  until that test exists.

## Copy audit

Counts treat commands, paths, hyphenated terms, and code identifiers as one
word. UI status fragments and literal sample-report values are included where
they are visitor-facing; raw commands and filenames are noted as fragments.
No sentence exceeds 22 words, no banned marketing word occurs, and the terms
`workflow`, `runner profile`, `report`, `static finding`, `observed finding`,
and `sample data` remain consistent. No additional copy finding was found.

### Landing page

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | Wordmark; pass |
| Runner migration check | 3 | Label; pass |
| Check workflow differences before changing CI runners | 7 | H1; pass |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Pass |
| Try it with sample data | 5 | Result-naming primary action; pass |
| Open the sample report. | 4 | Pass |
| No workflow steps run | 4 | Claim-covered fact; pass |
| No accounts or telemetry | 4 | Claim-covered fact; pass |
| Free and open source | 4 | Claim-covered fact; pass |
| Runner racks line a night market under connected parity signs. | 10 | Image alt; pass |
| Each sign represents one sample workflow requirement. | 7 | Pass |
| Find incompatible steps before switching runners | 6 | H2; pass |
| Read the bundled sample report. | 5 | Pass |
| NONPORTABLE | 1 | Sample status; pass |
| 6 errors | 2 | Sample status; pass |
| 8 warnings | 2 | Sample status; pass |
| Floating runner image can drift | 5 | Sample finding; pass |
| Container image is not pinned by digest | 7 | Sample finding; pass |
| Action reference is mutable | 4 | Sample finding; pass |
| Action depends on GitHub-hosted runner behavior | 6 | Sample finding; pass |
| Read all 14 findings | 4 | Result-naming link; pass |
| How the check works | 4 | H2; pass |
| Point at a repository | 4 | H3; pass |
| The CLI reads YAML files under `.github/workflows`. | 7 | Covered by `static-inventory`; pass |
| Choose a runner profile | 4 | H3; pass |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | Covered by `versioned-profiles`; pass |
| Share the compatibility report | 4 | H3; pass |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | Covered by `report-formats`; pass |
| Start for real | 3 | Section label; pass in context |
| Run the check on your repository | 6 | H2; pass |
| Install the CLI. | 3 | Pass |
| Then choose a versioned target profile. | 6 | Covered by `versioned-profiles`; pass |
| Copy install command | 3 | Result-naming button; pass |
| A readiness report, not another runner | 6 | H2; pass |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | Execution boundary covered; pass |
| Static findings show declared risks. | 5 | Pass |
| Observed findings show local probe failures. | 6 | Covered by `observed-probes`; pass |
| Read the privacy boundary | 4 | Result-naming link; pass |
| Check workflow differences before changing CI runners. | 7 | Footer; pass |
| Built by Param Factory · v0.1.0 | 5 | Footer build label; pass |

### README

| Copy | Words | Check |
| --- | ---: | --- |
| Action Parity Probe | 3 | H1; pass |
| Check a GitHub Actions workflow before changing runners. | 8 | Pass |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Pass |
| It inventories workflow requirements and compares them with a versioned runner profile. | 11 | Covered by `static-inventory`; pass |
| Static warnings stay separate from opt-in host checks that run only with `--probe --sandbox`. | 13 | Pass |
| It never runs workflow steps. | 5 | Covered by `no-workflow-execution`; pass |
| Install | 1 | H2; pass |
| Try the bundled demo | 4 | H2; pass |
| The command copies a sample repository to a temporary directory. | 10 | Covered by `demo-sandbox`; pass |
| It checks the bundled `act` profile. | 6 | Covered by `demo-sandbox`; pass |
| It saves a Markdown report and prints the path. | 9 | Covered by `demo-sandbox`; pass |
| Nothing is written to your repository. | 6 | F-2-3; test scope incomplete |
| Open the same sample report at action-parity-probe.sociobot.in/?demo=1. | 8 | Covered by `browser-cli-sample`; pass |
| Check a repository | 4 | H2; pass |
| Human-readable report. | 2 | Code comment; pass |
| Exit 1 means a nonportable requirement was found. | 8 | Covered by `exit-codes`; pass |
| Machine-readable report for CI. | 4 | Code comment; pass |
| Check the current host without running workflow steps. | 8 | Code comment; pass |
| List bundled, versioned profiles. | 4 | Code comment; pass |
| The probe checks declared commands and shells on the current host. | 11 | Covered by `probe-scope`; pass |
| It also reports filesystem case behavior and Docker socket access. | 10 | Covered by `probe-scope`; pass |
| It does not execute workflow files, actions, or step scripts. | 10 | Covered by `no-workflow-execution`; pass |
| Output formats | 2 | H3; pass |
| terminal: compact report for people. | 5 | Covered by `report-formats`; pass |
| json: structured output for scripts. | 5 | Covered by `report-formats`; pass |
| markdown: a report you can attach to a review. | 8 | Covered by `report-formats`; pass |
| sarif: findings for code-scanning tools. | 5 | Covered by `report-formats`; pass |
| Exit 0 means portable or warnings only. | 7 | Covered by `exit-codes`; pass |
| Exit 1 means a nonportable requirement. | 6 | Covered by `exit-codes`; pass |
| Exit 2 means invalid input or usage. | 7 | Covered by `exit-codes`; pass |
| What it checks | 4 | H2; pass |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | Covered by `static-inventory`; pass |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | Covered by `versioned-profiles`; pass |
| Rules check runner labels, services, and job containers. | 8 | Covered by `rule-coverage`; pass |
| They check OpenID Connect (OIDC) permissions and unavailable shells. | 9 | Covered by `rule-coverage`; pass |
| They also check hosted-only actions, movable action versions, missing commands, Docker access, and hard-coded GitHub-hosted paths. | 15 | Covered by `rule-coverage`; pass |
| This is a readiness check. | 5 | Scope statement; pass |
| It is not a CI runner, a workflow translator, or a guarantee that a workflow will pass. | 17 | Scope statement; pass |
| Develop and verify | 3 | H2; pass |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Verified; pass |
| `npm run build` creates the static site at `dist/site/`. | 9 | Verified; pass |
| Run only the Rust suite with `cargo test`. | 8 | Instruction; pass |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Instruction; pass |
| Deploy | 1 | H2; pass |
| Publish `dist/site/` to the static host. | 6 | Instruction; pass |
| Keep the supplied `staticwebapp.config.json` with the build output. | 8 | Instruction; pass |
| It preserves the SPA routes and the styled 404 response. | 10 | Verified; pass |
| After deployment, check `/?demo=1`, `/privacy`, `/terms`, and an unknown URL. | 8 | Instruction; pass |
| Privacy and security | 3 | H2; pass |
| The CLI includes no telemetry or network client code. | 9 | Covered by `cli-privacy`; pass |
| Repository contents stay on the machine where the command runs. | 10 | Same preservation scope; F-2-3 |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | Covered by `site-privacy` and `no-accounts-or-telemetry`; pass |
| License | 1 | H2; pass |
| MIT. | 1 | Covered by `free-open-source`; pass |
| See LICENSE. | 2 | Pass |

## Demo and sandbox checks

- The hero action reaches `/?demo=1` in one click. At 390×844, the visible
  sample result begins at y=294 and ends at y=447. It shows `NONPORTABLE`, six
  errors, eight warnings, and `APP003 · Floating runner image can drift`.
- The live banner exactly says “Demo — sample data, nothing is saved.” It has
  Reset demo and Install the CLI controls. F-2-1 records why the first control
  is not working.
- A seeded `localStorage` key, `real:review-marker=keep`, survived demo entry,
  Reset demo, and exit to `/#install`. The fresh demo context had zero
  `localStorage` and `sessionStorage` entries. It made only same-origin
  requests. No offline claim appears in the landing, README, or claims file,
  so no offline promise was assessed.
- The CLI `demo-sandbox` claim ran in the clean clone and verified bundled
  sample data, a temporary report path, and the root sentinel. F-2-3 records
  the remaining recursive-preservation gap.

## Registered claims

I cloned `main` into `/tmp/action-parity-probe-review-2-HQwh13`, ran `npm ci`,
then ran every exact `test` command in `.factory/claims.json`. All passed. The
clean clone's final full `npm test` and `npm run build` also passed; Playwright
recorded `{"status":"passed","failedTests":[]}` and produced `dist/site/`.

| Claim | Exact registered test | Result |
| --- | --- | --- |
| `static-inventory` | `npm test -- --grep @claim:static-inventory` | PASS |
| `no-workflow-execution` | `npm test -- --grep @claim:no-workflow-execution` | PASS |
| `observed-probes` | `npm test -- --grep @claim:observed-probes` | PASS |
| `report-formats` | `npm test -- --grep @claim:report-formats` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS with F-2-3 scope gap |
| `versioned-profiles` | `npm test -- --grep @claim:versioned-profiles` | PASS |
| `browser-demo-entry` | `npm test -- --grep @claim:browser-demo-entry` | PASS |
| `browser-cli-sample` | `npm test -- --grep @claim:browser-cli-sample` | PASS |
| `exit-codes` | `npm test -- --grep @claim:exit-codes` | PASS |
| `probe-scope` | `npm test -- --grep @claim:probe-scope` | PASS |
| `rule-coverage` | `npm test -- --grep @claim:rule-coverage` | PASS |
| `site-privacy` | `npm test -- --grep @claim:site-privacy` | PASS |
| `no-accounts-or-telemetry` | `npm test -- --grep @claim:no-accounts-or-telemetry` | PASS |
| `cli-privacy` | `npm test -- --grep @claim:cli-privacy` | PASS |
| `free-open-source` | `npm test -- --grep @claim:free-open-source` | PASS |

The live landing and README were cross-checked against these entries. The
claim-like statements are registered or are instructions/scope boundaries.
F-2-3 is not an unlisted claim: it is an insufficient observable assertion
for the registered `demo-sandbox` promise.

## Earlier findings verification

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the prior
`.factory/handoff.md`, then checked the live artifact and current code. Every
earlier finding is fixed except the incomplete F-1-13 assertion recorded as
F-2-3.

| Earlier finding | Live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | Mobile demo result and finding are above the 844 px fold; `browser-demo-entry` asserts it. | Fixed |
| F-1-2 | Hero CTA is `Try it with sample data`; `browser-demo-entry` covers one click and the result. | Fixed |
| F-1-3 | `browser-cli-sample` compares the CLI report and browser fixture. | Fixed |
| F-1-4 | The untested Rust-version statement is absent. | Fixed |
| F-1-5 | The single-binary packaging promise is absent. | Fixed |
| F-1-6 | Browser/CLI sample equality is asserted by `browser-cli-sample`. | Fixed |
| F-1-7 | `exit-codes` asserts 0, 1, and 2. | Fixed |
| F-1-8 | `probe-scope` asserts commands, shell, case behavior, Docker, and no workflow run. | Fixed |
| F-1-9 | The separate probe temporary-directory promise is absent. | Fixed |
| F-1-10 | `rule-coverage` asserts every named rule family. | Fixed |
| F-1-11 | Copy now says “no telemetry or network client code”; the source/dependency claim tests that narrower statement. | Fixed |
| F-1-12 | The exact four IDs and aliases are asserted. | Fixed |
| F-1-13 | Only root names and one root file are compared; see F-2-3. | **Half-fixed / blocking** |
| F-1-14 | README introduction is split; all sentences are within the cap. | Fixed |
| F-1-15 | README demo description is split; all sentences are within the cap. | Fixed |
| F-1-16 | Exit contract is split into three short sentences. | Fixed |
| F-1-17 | Copy explicitly names `--probe --sandbox`. | Fixed |
| F-1-18 | The command comment now states that workflow steps do not run. | Fixed |
| F-1-19 | OIDC is expanded and rule copy is split. | Fixed |
| F-1-20 | The heading is “Share the compatibility report.” | Fixed |
| F-1-21 | The demo-exit action is “Install the CLI.” | Fixed |
| F-1-22 | JSON is described as structured output. | Fixed |
| F-1-23 | Markdown is described as a report for a review. | Fixed |
| F-1-24 | Caption now names the sample workflow requirement. | Fixed |
| F-1-25 | Preview heading now names incompatible steps. | Fixed |
| F-1-26 | The live HTTP 404 has canonical, OG, Twitter, favicon, and apple-touch metadata. | Fixed |
| F-1-27 | The live HTTP 404 header contains Demo, Install, and Privacy. | Fixed |
| F-1-28 | README documents the static-host deploy, routes, and 404 check. | Fixed |

## Structure, accessibility, and crawl

| Check | Result |
| --- | --- |
| Titles and metadata | PASS: home is “Action Parity Probe — check runner differences”; route titles follow the route-first pattern. Every checked route has one H1, description, canonical, OG, Twitter, favicon, and `lang=en`. |
| Routes and history | PASS: `/`, `/?demo=1`, `/demo`, `/privacy`, and `/terms` render correctly; the live unknown route returns the designed HTTP 404. The existing history/focus regression passed in the clean clone. |
| Links and shell | PASS: every internal link (`/`, demo, install anchor, privacy, terms, skip link) returned 200; the external source link is explicit. Header/footer consistently include Privacy and Terms. |
| Static-host/security files | PASS: `robots.txt`, sitemap, CSP, `X-Content-Type-Options`, and Referrer-Policy are live. Sitemap lists all product routes. |
| Accessibility | PASS: live Playwright Axe found zero serious or critical issues on five routes at 390 and 1440 widths. `scripts/verify-url.sh` passed against the live home page. |
| Identity and payload | PASS: the night-market runner art, ticket corners, neon inspection palette, and self-hosted Space Grotesk/IBM Plex Mono are product-specific, not a generic SaaS template. The clean build remains well below the static JavaScript budget. |

## Missed leverage

No AI feature is required. Deterministic local analysis is the product's
appropriate core, and adding a model would weaken auditability. Import is the
repository path and the CLI exports terminal, JSON, Markdown, and SARIF, so no
additional import/export or sync feature is implied by the researched brief.

## What would make this perfect

Ship a real self-hosted recording of `action-parity-probe demo`, make Reset
demo either genuinely resettable or absent, and turn the repository
preservation check into a recursive snapshot test. Then rerun all 15 exact
claim commands, the full suite, the live mobile/desktop demo, privacy
interception, route crawl, and this review from a fresh context.
