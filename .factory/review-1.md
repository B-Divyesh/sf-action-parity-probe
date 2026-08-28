# Adversarial first-read review 1 — Action Parity Probe

Reviewed: 28 August 2026

Live URL: https://action-parity-probe.sociobot.in

Candidate: `3e341ac7ce6fe2db5fe630318e1ba41ee6f317ff`

## Verdict

**FAIL.** The cold landing page is clear, the CLI works, all ten registered
claim commands pass, and the three earlier release blockers remain fixed.
However, the 390 px demo hides the actual result below the first viewport,
several reliance-worthy statements have no matching claim or are stronger than
their tests, and copy/404/documentation findings remain. PASS requires zero
findings and no untested claim.

## Cold first read

Fresh contexts were opened without scrolling at 390×844 and 1440×900.

| Question | My first-read answer | Exact first-screen evidence | Result |
| --- | --- | --- | --- |
| What does it do? | It checks a GitHub Actions workflow for problems before moving it to another CI runner. | “Check workflow differences before changing CI runners” | Clear |
| For whom? | Platform teams considering local or alternate runners, especially before an outage forces a move. | “For platform teams comparing local or alternate runners before an outage forces the move.” | Clear |
| What should I click first? | Open the sample report. | “Try it with sample data” and “See a real report in one click.” | Clear |

The mobile first screen also showed the three facts. The desktop first screen
showed the original night-market runner art. No first-screen clarity blocker
was found.

## Findings

### Blocking

#### F-1-1 — The mobile demo withholds its result below the first viewport

- **Quote/location:** `/demo`, 390×844. The first viewport shows the banner,
  “See the sample workflow differences,” four inventory counts, and only the
  terminal chrome (`sample-repo / release.yml`). The result line
  “NONPORTABLE · 6 errors · 8 warnings” begins below the fold. The report box
  starts at y=778 px; its result is not visible by y=844 px.
- **Why this fails:** after the one-click demo action, a phone visitor still
  has to scroll before seeing what the product found. Inventory counts do not
  show the main job-to-be-done: identifying runner incompatibilities.
- **Concrete fix:** compact the banner/intro/summary on mobile or place a result
  summary directly below the heading so “NONPORTABLE · 6 errors · 8 warnings”
  and one realistic finding are fully visible at 390×844. Add a tagged browser
  demo claim that asserts those elements are inside the initial viewport.

#### F-1-2 — “See a real report in one click” is an unlisted claim

- **Quote/location:** landing hero, `site/src/main.js:92`.
- **Why this fails:** no `.factory/claims.json` entry tests the browser CTA,
  click count, or report result. `demo-sandbox` tests the CLI command, not the
  landing-to-browser-demo path.
- **Concrete fix:** add `browser-demo-entry` with a fresh 390 px test that
  clicks the hero action once and asserts `/demo`, the demo banner, result
  summary, and a sample finding. Alternatively, remove the sentence.

#### F-1-3 — The “real CLI” provenance statement is unlisted

- **Quote/location:** landing preview, `site/src/main.js:106`: “This recorded
  output comes from the bundled workflow and the real CLI.”
- **Why this fails:** no claim test proves that the deployed browser report is
  generated from the CLI rather than a manually edited fixture.
- **Concrete fix:** add a claim test that runs the built CLI against the bundled
  workflow and compares profile, summary, inventory, and findings with
  `site/src/demo-report.json`; fail on any divergence.

#### F-1-4 — The minimum Rust version is an unlisted claim

- **Quote/location:** `README.md:17`: “Rust 1.85 or newer is required.”
- **Why this fails:** the clean-clone suite uses the installed toolchain and
  does not prove the stated minimum supported version.
- **Concrete fix:** add a `rust-msrv` claim and run `cargo +1.85 check --locked`
  in its test, or stop naming an unverified minimum.

#### F-1-5 — Single-binary packaging is an unlisted claim

- **Quote/location:** `README.md:17-18`: “Releases can be packaged as one binary
  with `cargo build --release`.” The landing also says “Build the single Rust
  binary.”
- **Why this fails:** no claim entry tests the release artifact or its runtime
  dependencies.
- **Concrete fix:** add a `single-binary` claim test that builds release mode,
  verifies one executable artifact, and runs `--help` from a clean temporary
  consumer directory; otherwise rewrite this as the literal build command
  without the packaging promise.

#### F-1-6 — Browser/CLI sample equivalence is unlisted

- **Quote/location:** `README.md:30-31`: “The same sample appears at
  action-parity-probe.sociobot.in/demo.”
- **Why this fails:** the current tests exercise each demo separately but never
  prove that their sample input and report agree.
- **Concrete fix:** add `same-demo-sample` and compare a stable fixture hash and
  key report fields produced by the CLI with those rendered at `/demo`.

#### F-1-7 — The complete exit-code contract is unlisted

- **Quote/location:** `README.md:65-66`: “Exit codes are `0` for portable or
  warning-only reports, `1` when at least one nonportable requirement is found,
  and `2` for invalid input or usage.”
- **Why this fails:** CLI tests cover examples, but no claims entry owns and
  tests all three public outcomes promised in this sentence.
- **Concrete fix:** add `exit-codes` with fixtures for portable/warning-only,
  nonportable, and invalid input, asserting 0, 1, and 2 respectively.

#### F-1-8 — The host-probe scope is unlisted

- **Quote/location:** `README.md:54-55`: “The probe suite only tests the current
  host for declared commands, shells, case sensitivity, and Docker access.”
- **Why this fails:** `observed-probes` only forces missing-command failures; it
  does not verify the stated boundary or all four probe classes.
- **Concrete fix:** add a `probe-scope` claim with controlled fixtures for each
  class and a negative assertion that no workflow command or undeclared probe
  runs.

#### F-1-9 — Temporary-directory use by probes is unlisted

- **Quote/location:** `README.md:55`: “It uses a temporary directory.”
- **Why this fails:** `demo-sandbox` covers the `demo` command, not the separate
  `check --probe --sandbox` behavior described here.
- **Concrete fix:** add a probe-sandbox claim that sets an isolated temp root,
  confirms probe artifacts stay under it, and confirms cleanup/current working
  directory preservation.

#### F-1-10 — The full rules list is unlisted

- **Quote/location:** `README.md:73-75`: “Rules flag runner labels, service
  support, job containers, OIDC, shells, hosted-only actions, floating action
  refs, missing commands, and common host-path assumptions.”
- **Why this fails:** `static-inventory` proves inventory groups exist; it does
  not assert a finding for every advertised rule category.
- **Concrete fix:** add `rule-coverage` with one fixture and expected rule ID
  per named category, or shorten the sentence to only tested categories.

#### F-1-11 — The CLI network claim is stronger than its test

- **Quote/location:** `README.md:95`: “The CLI has no telemetry and makes no
  network requests.”
- **Why this fails:** `cli-privacy` searches source and dependency names. It
  does not observe an actual CLI run, so indirect process/network behavior is
  outside the assertion.
- **Concrete fix:** run `demo` and representative `check` commands in a network
  namespace or syscall monitor that rejects and records outbound connections;
  assert zero attempts. Keep the source scan as a second assertion.

#### F-1-12 — Named runner-profile coverage is under-tested

- **Quote/location:** landing/README: “Compare with GitHub-hosted, act, generic
  Linux, or self-hosted Linux.”
- **Why this fails:** `versioned-profiles` asserts only that four items exist
  and their versions match `YYYY-MM`; any four profile IDs would pass.
- **Concrete fix:** assert the exact four IDs and resolve every documented
  alias to the expected profile.

#### F-1-13 — “Nothing is written to your repository” is under-tested

- **Quote/location:** `README.md:28`.
- **Why this fails:** `demo-sandbox` reads the emitted report, but it does not
  snapshot the invoking repository before and after the demo. The behavior did
  pass this review's temporary-directory exercise, but the registered claim
  remains incomplete.
- **Concrete fix:** extend `@claim:demo-sandbox` to run from a fixture repository
  with sentinels and compare its full tree/content/metadata before and after.

### Minor

#### F-1-14 — README introduction exceeds the 22-word cap

- **Quote/location:** `README.md:6-8`, 25 words: “It inventories what a workflow
  expects, compares those requirements with a versioned runner profile, and
  separates static warnings from failures observed by safe local probes.”
- **Concrete fix:** “It inventories workflow requirements and compares them
  with a versioned runner profile. Static warnings stay separate from local
  probe failures.”

#### F-1-15 — README demo sentence exceeds the 22-word cap

- **Quote/location:** `README.md:26-28`, 25 words.
- **Concrete fix:** “The command copies a sample repository to a temporary
  directory and checks it against the bundled `act` profile. It saves a
  Markdown report and prints the path.”

#### F-1-16 — README exit-code sentence exceeds the 22-word cap

- **Quote/location:** `README.md:65-66`, 25 words.
- **Concrete fix:** “Exit `0` means portable or warnings only. Exit `1` means a
  nonportable requirement. Exit `2` means invalid input or usage.”

#### F-1-17 — “Safe local probes” is an unexplained adjective

- **Quote/location:** `README.md:8`: “safe local probes.”
- **Why this fails:** “safe” does not name the restriction that makes the probe
  safe.
- **Concrete fix:** “opt-in host checks that run only with `--probe --sandbox`.”

#### F-1-18 — The command comment repeats the vague “safe” label

- **Quote/location:** `README.md:45`: “Add safe, observed environment probes.”
- **Concrete fix:** “Check the current host without running workflow steps.”

#### F-1-19 — The rules sentence is jargon-dense

- **Quote/location:** `README.md:73-75`: “OIDC,” “action refs,” and “host-path
  assumptions” are not expanded.
- **Concrete fix:** “Rules flag unsupported OpenID Connect (OIDC) permissions,
  action versions that can move, and hard-coded runner paths.” Keep the
  remaining categories in a short list.

#### F-1-20 — “Carry the report” does not make sense out of context

- **Quote/location:** landing step heading, `site/src/main.js:117`.
- **Concrete fix:** “Share the compatibility report.”

#### F-1-21 — “Start for real” is not a result-naming action

- **Quote/location:** demo banner link, `site/src/main.js:150`.
- **Why this fails:** the destination is the install section, but the label
  does not say that.
- **Concrete fix:** “Install the CLI.”

#### F-1-22 — “Stable, typed report” is unexplained jargon

- **Quote/location:** `README.md:61`: “`json`: stable, typed report for scripts.”
- **Concrete fix:** “`json`: structured output for scripts.” If schema
  stability is a promise, register and test it separately.

#### F-1-23 — “Portable review artifact” is unclear

- **Quote/location:** `README.md:62`.
- **Concrete fix:** “`markdown`: a report you can attach to a review.”

#### F-1-24 — The hero caption uses the visual metaphor instead of the job

- **Quote/location:** landing figure caption: “Every bright sign is a declared
  requirement.”
- **Why this fails:** “bright sign” only makes sense after interpreting the
  artwork and “declared requirement” is abstract.
- **Concrete fix:** “Each sign represents one requirement found in the sample
  workflow.”

#### F-1-25 — The preview heading uses abstract nouns

- **Quote/location:** landing h2: “See the mismatch before the migration.”
- **Concrete fix:** “Find incompatible steps before switching runners.”

#### F-1-26 — The deployed 404 omits route metadata

- **Quote/location:** live `/missing-route` and `site/public/404.html`.
- **Why this fails:** the designed 404 has a valid title, description, favicon,
  h1, and way home, but no canonical, Open Graph/Twitter metadata, or
  apple-touch icon. The route metadata contract applies per route.
- **Concrete fix:** add a canonical for the 404 document, noindex-compatible OG
  and Twitter fields using the product art, and the shipped apple-touch icon.

#### F-1-27 — The 404 header is inconsistent

- **Quote/location:** normal routes show “Demo · Install · Privacy”; the live
  404 and `site/public/404.html` show “Demo · Privacy.”
- **Concrete fix:** include the same Install link (`/#install`) in the 404
  header and add a regression that compares header destinations across all
  routes.

#### F-1-28 — README does not explain deployment

- **Quote/location:** README has Install, Develop and verify, Privacy, and
  License sections, but no deployment section.
- **Why this fails:** it says the build output path but not how to serve the SPA
  routes and real 404 without breaking them.
- **Concrete fix:** add a Deploy section: publish `dist/site/`, preserve the
  supplied `staticwebapp.config.json`, and verify `/demo`, `/privacy`, `/terms`,
  and an unknown-route 404 after deployment.

## Copy audit

Counts treat hyphenated terms, commands, and paths as one word. The landing has
26 sentence-like copy items (180 words; 6.9 average). The README has 37
sentences including code comments and list descriptions (355 words; 9.6
average). No banned word from the supplied list appears.

### Landing page sentences and sentence-like headings

| Copy | Words | Audit |
| --- | ---: | --- |
| Check workflow differences before changing CI runners | 7 | Pass |
| For platform teams comparing local or alternate runners before an outage forces the move. | 14 | Pass |
| See a real report in one click. | 7 | F-1-2 |
| Runner racks line a night market under connected parity signs. | 10 | Pass; descriptive alt text |
| Every bright sign is a declared requirement. | 7 | F-1-24 |
| See the mismatch before the migration | 6 | F-1-25 |
| This recorded output comes from the bundled workflow and the real CLI. | 12 | F-1-3 |
| Floating runner image can drift | 5 | Pass; sample finding title |
| Container image is not pinned by digest | 7 | Pass; sample finding title |
| Action reference is mutable | 4 | Pass; sample finding title |
| Action depends on GitHub-hosted runner behavior | 6 | Pass; sample finding title |
| How the check works | 4 | Pass |
| Point at a repository | 4 | Pass |
| The CLI reads YAML files under `.github/workflows`. | 7 | Pass; covered by `static-inventory` |
| Choose a runner profile | 4 | Pass |
| Compare with GitHub-hosted, act, generic Linux, or self-hosted Linux. | 9 | F-1-12 |
| Carry the report | 3 | F-1-20 |
| Share terminal, JSON, Markdown, or SARIF output with your migration review. | 11 | Pass; covered by `report-formats` |
| Run the check on your repository | 6 | Pass |
| Build the single Rust binary. | 5 | F-1-5 |
| Then choose a versioned target profile. | 6 | Pass; covered by `versioned-profiles` |
| A readiness report, not another runner | 6 | Pass |
| It does not execute actions, translate YAML, or promise a passing build. | 12 | Pass; execution part covered by `no-workflow-execution` |
| Static findings show declared risks. | 5 | Pass |
| Observed findings show local probe failures. | 6 | Pass; covered by `observed-probes` |
| Check workflow differences before changing CI runners. | 7 | Pass; footer one-liner |

Landing interface fragments/actions: “Try it with sample data” (5, pass), “No
workflow steps run” (4, pass), “No accounts or telemetry” (4, pass), “Free and
open source” (4, pass), “Read all 14 findings” (4, pass), “Copy install command”
(3, pass), and “Read the privacy boundary” (4, pass). The demo action “Start
for real” is F-1-21. “Runner migration check” (3), “Start for real” (3), and
the report labels are fragments rather than sentences. Navigation nouns are
links, not result buttons.

### README sentences

| Copy | Words | Audit |
| --- | ---: | --- |
| Check a GitHub Actions workflow before changing runners. | 8 | Pass |
| Action Parity Probe is for platform teams comparing GitHub-hosted, `act`, and plain Linux runners. | 14 | Pass |
| It inventories what a workflow expects, compares those requirements with a versioned runner profile, and separates static warnings from failures observed by safe local probes. | 25 | F-1-14, F-1-17 |
| It never runs workflow steps. | 5 | Pass; `no-workflow-execution` |
| Rust 1.85 or newer is required. | 6 | F-1-4 |
| Releases can be packaged as one binary with `cargo build --release`. | 11 | F-1-5 |
| The command copies a sample repository into a temporary directory, checks it against the bundled `act-nektos-ubuntu-22.04@2026-08` profile, writes a Markdown report, and prints its path. | 25 | F-1-15; behavior maps partly to `demo-sandbox` |
| Nothing is written to your repository. | 6 | F-1-13 |
| The same sample appears at action-parity-probe.sociobot.in/demo. | 6 | F-1-6 |
| Human-readable report. | 2 | Pass; code comment |
| Exit 1 means a nonportable requirement was found. | 8 | F-1-7 |
| Machine-readable report for CI. | 4 | Pass; code comment |
| Add safe, observed environment probes. | 5 | F-1-18 |
| The explicit flag is required. | 5 | Pass |
| List bundled, versioned profiles. | 4 | Pass; code comment |
| The probe suite only tests the current host for declared commands, shells, case sensitivity, and Docker access. | 17 | F-1-8 |
| It uses a temporary directory. | 5 | F-1-9 |
| It does not execute workflow files, actions, or step scripts. | 10 | Pass; `no-workflow-execution` |
| `terminal`: compact report for people. | 5 | Pass |
| `json`: stable, typed report for scripts. | 6 | F-1-22 |
| `markdown`: portable review artifact. | 4 | F-1-23 |
| `sarif`: findings for code-scanning tools. | 5 | Pass |
| Exit codes are 0 for portable or warning-only reports, 1 when at least one nonportable requirement is found, and 2 for invalid input or usage. | 25 | F-1-7, F-1-16 |
| The inventory includes action references, job and service images, requested permissions, runner labels, explicit shells, and command assumptions in `run` steps. | 21 | Pass; `static-inventory` |
| Profiles cover GitHub-hosted Ubuntu, `act`, generic Linux, and self-hosted Linux. | 10 | F-1-12 |
| Rules flag runner labels, service support, job containers, OIDC, shells, hosted-only actions, floating action refs, missing commands, and common host-path assumptions. | 21 | F-1-10, F-1-19 |
| This is a readiness check. | 5 | Pass |
| It is not a CI runner, a workflow translator, or a guarantee that a workflow will pass. | 17 | Pass; clear boundary |
| `npm test` runs Rust tests plus the site and claim tests. | 11 | Verified in this review |
| `npm run build` creates the static site at `dist/site/`. | 9 | Verified in this review |
| Run only the Rust suite with `cargo test`. | 8 | Pass |
| Package the CLI with `cargo package --allow-dirty`. | 7 | Pass; instruction |
| The CLI has no telemetry and makes no network requests. | 10 | F-1-11 |
| Repository contents stay on the machine where the command runs. | 10 | Covered in scope by `cli-privacy`; see F-1-11 for behavioral evidence gap |
| The site has no accounts, analytics, third-party scripts, cookies, or browser storage. | 12 | Pass; `site-privacy` and `no-accounts-or-telemetry` |
| MIT. | 1 | Pass; `free-open-source` |
| See LICENSE. | 2 | Pass |

README headings were also checked: “Action Parity Probe,” “Install,” “Try the
bundled demo,” “Check a repository,” “Output formats,” “What it checks,”
“Develop and verify,” “Privacy and security,” and “License” all identify their
sections out of context.

Terminology is internally consistent for `workflow`, `runner profile`,
`report`, `static finding`, `observed finding`, `sample data`, and `sandbox`.
Unexplained or vague terms are identified in F-1-17 through F-1-23.

## Demo and sandbox evidence

- The hero action reaches `/demo` in one click on mobile and desktop.
- The persistent banner says “Demo — sample data, nothing is saved” and offers
  Reset demo and Start for real.
- Reset replayed the report animation, announced “Demo reset. Sample data is
  unchanged,” and left the report unchanged.
- Fresh contexts made only same-origin requests and had no cookies,
  `localStorage`, or `sessionStorage` entries.
- A seeded `real:review-marker` localStorage value survived entry, reset, and
  exit from demo; the browser demo did not read or alter it.
- The CLI demo was run from an empty temporary working directory. It exited 0,
  left that directory empty, used bundled sample data, and wrote the report to
  a separate `/tmp/action-parity-probe-demo-*` directory.
- No offline browser claim is made; there is no service worker to test.
- F-1-1 remains because the report result is below the first mobile viewport.

## Registered claim results

Every exact command from `.factory/claims.json` ran from a fresh local clone
after `npm ci`.

| Claim | Exact command | Result |
| --- | --- | --- |
| `static-inventory` | `npm test -- --grep @claim:static-inventory` | PASS (desktop + mobile) |
| `no-workflow-execution` | `npm test -- --grep @claim:no-workflow-execution` | PASS (desktop + mobile) |
| `observed-probes` | `npm test -- --grep @claim:observed-probes` | PASS (desktop + mobile) |
| `report-formats` | `npm test -- --grep @claim:report-formats` | PASS (desktop + mobile) |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS (desktop + mobile) |
| `versioned-profiles` | `npm test -- --grep @claim:versioned-profiles` | PASS (desktop + mobile) |
| `site-privacy` | `npm test -- --grep @claim:site-privacy` | PASS (desktop + mobile) |
| `no-accounts-or-telemetry` | `npm test -- --grep @claim:no-accounts-or-telemetry` | PASS (desktop + mobile) |
| `cli-privacy` | `npm test -- --grep @claim:cli-privacy` | PASS (desktop + mobile) |
| `free-open-source` | `npm test -- --grep @claim:free-open-source` | PASS (desktop + mobile) |

No listed test failed. F-1-2 through F-1-13 cover unlisted statements or gaps
between the statement and the observable assertion.

## History verification

No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists. I read the
current handoff, its earlier committed versions, and both verification reports.

| Earlier finding/gap | Live confirmation | Code/test confirmation | Status |
| --- | --- | --- | --- |
| Unknown URLs returned 200 | `/missing-route` now returns HTTP 404 with the styled page | `responseOverrides["404"]` rewrites `/404.html` with status 404; regression passes | Fixed |
| Mobile targets below 44×44 | At 390 px: Demo 44×44, footer Privacy 46×44, Terms 44×44, Source 45×44 | Mobile target regression passes | Fixed |
| “No accounts or telemetry” was unlisted | Fresh route crawl found no auth UI, cookies, storage, or cross-origin requests | `no-accounts-or-telemetry` entry and tagged test exist and pass | Fixed |
| `scripts/verify-url.sh` was missing | Script passes against the live home page | Script exists and is executable | Fixed |
| Handoff test count was stale | Fresh suite reports 38 passed and 2 expected skips | Current handoff uses those counts | Fixed |
| Repair handoff awaited live 404 deployment | Live response is now 404 | Live JS/CSS SHA-256 values match the clean candidate build | Fixed |

The original product handoff's documented limits remain honest: expressions,
custom actions, and reusable workflows are not expanded; profiles are dated;
and probes observe the local host rather than a remote runner. None has
regressed into a contradictory live claim.

## Structure, accessibility, and crawl

| Check | Result |
| --- | --- |
| Route titles | PASS: home uses “Product — what it does”; Demo, Privacy, Terms, and Not found use route-first titles |
| One h1, `lang`, `main`, descriptions | PASS on `/`, `/demo`, `/privacy`, `/terms`, and the deployed 404 |
| Canonical/OG/favicon | PASS on product routes; F-1-26 on the standalone 404 |
| Designed 404 and HTTP status | PASS: product-specific cable art, route language, way home, HTTP 404 |
| Deep links | PASS: `/demo`, `/privacy`, and `/terms` return 200 and render the right state |
| History/focus | PASS: route changes and back focus the h1; scripted back navigation restores saved scroll |
| Link crawl | PASS: every real internal and external link returned 200 |
| Header/footer | PASS on app routes; F-1-27 on the 404 header |
| Sitemap/robots | PASS: all four product routes listed; sitemap declared in robots.txt |
| Accessibility | PASS: no serious/critical axe findings at 390 or 1440; visible focus, reduced motion, and target sizes verified |
| Console | PASS on real product routes; the expected failed-document message occurs only for an intentional HTTP 404 |
| Identity | PASS: the dark night-market runner scene, ticket corners, neon status palette, self-hosted type, and one-shot row motion are specific rather than a generic SaaS template |
| Payload | PASS: clean build JS is 18,032 bytes raw / 5.62 KB gzip; CSS is 12,327 bytes raw / 3.48 KB gzip |

The live JS and CSS SHA-256 hashes match the clean-clone build. `npm test`
passed with 8 Rust tests, 38 Playwright tests, and 2 expected desktop skips.

## Missed leverage

No additional AI feature is justified. Static workflow analysis must remain
deterministic, auditable, local, and usable without a key. Import is already
the repository path, and terminal/JSON/Markdown/SARIF exports cover the brief.
A source-versus-target comparison command could be useful later, but the brief's
smallest useful product explicitly compares workflow requirements with one
versioned target profile, so it is not recorded as a defect.

## What would make this perfect

Resolve F-1-1 through F-1-28. In particular, expose the compatibility result
and one finding in the first 390×844 demo viewport, register every public
behavioral promise with an observable sandbox test, split or rewrite every
flagged copy sentence, and make the 404 metadata/header match the route
contract. Then rerun every exact claim command, the full suite, the live crawl,
privacy interception, and this complete first-read checklist from scratch.
