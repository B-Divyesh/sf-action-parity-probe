# Action Parity Probe review 6 — check workflow differences before changing CI runners

Reviewed: 6 September 2026  
Live URL: <https://action-parity-probe.sociobot.in>  
Implementation candidate: `2c489078e4c176dfe52dbd2aface3785bd69ff85`  
Documentation baseline: `2bcbc5cdb3c0e345091388db4621b8cf022ca0d5`

## Verdict

**PASS — zero findings and zero untested claims.**

The implementation candidate is the last product-change commit. The later commits through the documentation baseline are review-only. Fresh live CSS and JavaScript SHA-256 values match a clean build of that candidate:

- `index-vx95p5DO.js`: `6609a7e57f333ded18ba620a296f032f55bf717842c4f4738e20319ea1101bdb`
- `index-DZ7naWfj.css`: `755e01f3c5bf59c7c3938ba3c806368e9481a50a3a45a17eb7eb091835751ffc`

## Job, audience, and first action

The job is to check a GitHub Actions workflow for differences before changing CI runners. It is for platform teams comparing local or alternate runners, especially before an outage forces a move. The first action is **Try it with sample data**; the nearby text says **Open the sample report.**

Fresh, unscrolled Chromium contexts confirmed this on both required sizes.

| Viewport | First-screen evidence | Result |
| --- | --- | --- |
| 390×844 phone | The H1, audience sentence, primary link (217×52.8 px), and all three facts are visible. | Clear and usable |
| 1440×900 desktop | The same H1, audience sentence, primary link, facts, and factual `release.yml`/`act` sample caption are visible. | Clear and usable |

The first Tab reaches the visible **Skip to main content** link. Its measured focus treatment is a `rgb(55, 230, 255) solid 3px` outline with a 3 px offset. The phone page had no horizontal overflow. The mobile navigation and footer links measured at least 44×44 px.

## Demo and real-data boundary

One click opened `/?demo=1`. The phone demo showed the persistent **Demo — sample data, nothing is saved** label, `NONPORTABLE`, 6 errors, 8 warnings, and `APP003 · Floating runner image can drift` in the first viewport. The sample result box ended at y=461 px, above the 844 px fold. The desktop demo opened the populated report terminal with its nonportable summary in view.

I scrolled the demo terminal, used **Reset demo**, and observed scroll return to zero, the status **Sample restored. Recording restarted.**, and the `reset-sign-on` row animation. A seeded `localStorage` real-data sentinel remained `keep`; no demo key was added. A separate fresh context across home, demo, privacy, and terms had no cookies, no local/session storage, and only `https://action-parity-probe.sociobot.in` requests.

No offline or update behavior is promised. This static CLI/site has no backend, tenant, health, persistence, or rate-limited API surface, so tenant isolation, restart persistence, health, and 429/Retry-After checks do not apply.

## Claims and clean checkout

Clean checkout: `/tmp/action-parity-probe-review6-clean-yy6oCf/repo` at `2bcbc5c…`. `npm ci` completed with zero reported vulnerabilities. Every one of the 19 exact commands in `.factory/claims.json` was run separately and passed.

| Claim IDs | Result |
| --- | --- |
| `static-inventory`, `no-workflow-execution`, `read-only-check`, `observed-probes`, `report-formats` | PASS |
| `demo-sandbox`, `versioned-profiles`, `browser-demo-entry`, `browser-cli-sample`, `terminal-recording`, `demo-reset` | PASS |
| `exit-codes`, `probe-scope`, `rule-coverage`, `site-privacy`, `no-accounts-or-telemetry` | PASS |
| `cli-privacy`, `free-open-source`, `static-routing` | PASS |

The viewport-opposite copy of `browser-demo-entry` is intentionally skipped; the 390 px assertion ran and passed. Thus no registered claim is untested. There is no unlisted reliance-worthy claim on the landing, demo, legal pages, or README: the current copy audit maps each claim-like statement to a tagged claim or to a directly executed developer command.

The subsequent clean commands passed:

```text
npm test                                             PASS
npm run build                                        PASS; dist/site produced
cargo clippy --all-targets --all-features -- -D warnings  PASS
cargo fmt --check                                    PASS
cargo package --allow-dirty                          PASS
npm audit --omit=dev --audit-level=high              PASS; 0 vulnerabilities
```

`npm test` completed the production build, 2 Rust unit tests, 6 Rust CLI tests, and 65 Playwright assertions; 3 viewport-opposite tests were expected skips. The built application JavaScript is 5,897 bytes gzip. The hero WebP is 225,094 bytes and the self-hosted terminal recording is 2,004 bytes.

## Installed CLI exercise

From a clean temporary consumer directory, I installed the artifact into a separate temporary Cargo root and exercised its public binary. `--help` and `profiles --json` worked. `demo` printed a real nonportable report with static and observed findings and wrote a readable Markdown report under a fresh `/tmp/action-parity-probe-demo-*` directory. A missing input path returned 2 with an actionable error. `check --probe` without `--sandbox` returned 2 and explained the required flag. The normal, invalid, boundary, and recovery paths are also covered by the clean claim and Rust CLI suites.

## Live structure, accessibility, privacy, and routes

`scripts/verify-url.sh https://action-parity-probe.sociobot.in/` passed. Live Axe scans found zero violations on `/`, `/demo`, `/privacy`, `/terms`, and `/missing-route`. Each page had `lang=en`, one `<main>`, one H1, its own title, and the expected canonical URL.

| Route | Status | Title | H1 |
| --- | ---: | --- | --- |
| `/` | 200 | Action Parity Probe — check runner differences | Check workflow differences before changing CI runners |
| `/demo` | 200 | Demo — Action Parity Probe | See the sample workflow differences |
| `/privacy` | 200 | Privacy — Action Parity Probe | See what this product stores |
| `/terms` | 200 | Terms — Action Parity Probe | Use the report as migration evidence |
| `/missing-route` | 404 | Not found — Action Parity Probe | Page not found |

The deliberate unknown-route HTTP 404 is correct, styled, and has a return-home path; its expected failed-document request is not a defect. All rendered product links and the two public GitHub links resolved with HTTP 200. The live CSP restricts scripts, styles, images, fonts, and connections to `self` and also sends `frame-ancestors 'none'`, `nosniff`, strict referrer policy, and the listed restrictive permissions policy. No console error occurred on real routes. With `prefers-reduced-motion: reduce`, the report-row animation duration was `0.00001s`.

## Earlier finding disposition

Every earlier review, polish, verification, and handoff finding was read and rechecked. None regressed.

| Earlier IDs | Current evidence | Status |
| --- | --- | --- |
| F-1-1 | Phone sample result and first finding remain above the fold; `browser-demo-entry` passed. | Fixed |
| F-1-2, F-1-3, F-1-6 | One-click sample entry and browser/CLI fixture equivalence passed. | Fixed |
| F-1-4, F-1-5, F-1-9 | Unsupported Rust/single-binary and host-temp promises remain absent. | Fixed |
| F-1-7, F-1-8, F-1-10 to F-1-13 | Exit, probe scope, rule coverage, exact profiles, and recursive preservation claims passed. | Fixed |
| F-1-11 | CLI privacy wording remains limited to the tested source/dependency boundary. | Fixed |
| F-1-14 to F-1-19 | README sentences remain short, direct, and explain OIDC and the sandbox boundary. | Fixed |
| F-1-20 to F-1-25 | Direct action labels and factual sample caption remain; no decorative or mood-led copy returned. | Fixed |
| F-1-26 to F-1-28 | Live 404 metadata/shell and deployment documentation remain present. | Fixed |
| F-2-1 to F-2-3 | Reset is observable, terminal recording is self-hosted/real, and repository snapshots are recursive. | Fixed |
| F-4-1 to F-4-4 | Read-only checks, static routing, plain labels, and “Page not found” all passed. | Fixed |
| Verification-1 high findings | Live HTTP 404 is real; mobile targets meet 44 px; `no-accounts-or-telemetry` is a tested claim. | Fixed |
| Verification-1 minor gaps | `scripts/verify-url.sh` exists and passed; current test count is accurately recorded above. | Fixed |

## Findings

None. The product meets the brief as a static compatibility-reporting CLI. It does not need an AI feature: deterministic static and opt-in host evidence is the job, while an AI explanation feature would not fill a missing user need.

