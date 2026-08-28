# Independent verification — FAIL

**Candidate:** `88c1966699597ddfeceda6059824ee24225fe0e2`  
**Verified:** 28 August 2026  
**Live URL:** https://action-parity-probe.sociobot.in  
**Verifier work order:** `action-parity-probe-verify-1`

## Decision

**FAIL — do not release this candidate.** The CLI and the deployed application
work, but the candidate misses explicit acceptance requirements: a real HTTP
404 response, 44 by 44 px mobile touch targets, and a claims-sandbox test for
the visible privacy claim. These are not deployment-only failures; the live
site byte-matches the candidate build.

## First read and demo

Cold-loading the live landing page gave this answer without setup:

- **Does:** “Check workflow differences before changing CI runners.”
- **For whom:** “platform teams comparing local or alternate runners before an
  outage forces the move.”
- **First action:** “Try it with sample data”; adjacent copy says “See a real
  report in one click.”

The CTA keyboard-opens `/demo`. At 390 px it shows the persistent “Demo —
sample data, nothing is saved” banner, reset action, real-start link, and the
bundled workflow report. This part passes the plain-words and one-click-demo
gate.

## Clean-checkout checks that passed

- `npm ci` completed with 0 vulnerabilities.
- Every command listed in `.factory/claims.json` was run from the clean tree:
  `@claim:static-inventory`, `@claim:no-workflow-execution`,
  `@claim:observed-probes`, `@claim:report-formats`,
  `@claim:demo-sandbox`, `@claim:versioned-profiles`,
  `@claim:site-privacy`, `@claim:cli-privacy`, and
  `@claim:free-open-source`. All passed.
- `npm test` passed: production site build, 8 Rust tests, and 34 Playwright
  tests. It exercised all nine claims on Chromium and 390 px mobile; local axe
  checks reported no serious or critical violations.
- `npm run build` passed and produced `dist/site/`. Measured build payloads:
  JS 18,032 bytes raw / 5.62 KB gzip; CSS 12,161 bytes raw / 3.46 KB gzip.
- `cargo clippy --all-targets --all-features -- -D warnings` passed.
- `cargo package --allow-dirty` packaged and verified 20 files (67.9 KiB,
  19.0 KiB compressed). The crate was extracted into a fresh temporary
  consumer, installed with `cargo install --path`, then its installed
  `action-parity-probe 0.1.0` binary successfully ran `demo` and wrote a
  temporary Markdown report.

## End-to-end CLI evidence

- `action-parity-probe demo` scanned the bundled release workflow and produced
  a nonportable report with separately-labelled static and observed findings.
- `profiles --json` returned four dated profiles, all `@2026-08`.
- An empty repository returned exit 2 with an actionable “no workflow files
  found” message.
- An unknown profile returned exit 2 and told the user to run `profiles`.
- `check … --probe` without `--sandbox` returned exit 2 and refused probing.

## Live deployment, privacy, and accessibility evidence

- The current live JS and CSS asset names are `index-H9gDdRMM.js` and
  `index-CSummqb9.css`. SHA-256 values match the fresh `dist/site` files
  byte-for-byte.
- Cold live loads of `/`, `/demo`, `/privacy`, and `/terms` each had one h1,
  route-correct title, no console/page errors, no serious/critical axe
  findings, only same-origin requests, and empty `localStorage` and
  `sessionStorage`.
- Keyboard testing found the skip link first; when focused it is visible at
  193 by 48.8 px with a 3 px cyan outline and black separation. Keyboard Enter
  on the demo CTA navigated to `/demo`.
- At 390 px, the demo has no horizontal overflow (`scrollWidth = clientWidth =
  390`) and reduced motion is declared in CSS.
- Live headers include HSTS, `X-Content-Type-Options: nosniff`, strict-origin
  referrer policy, a same-origin CSP, and restrictive permissions policy.
  Hashed JS has `Cache-Control: public, max-age=31536000, immutable`; HTML has
  short revalidation caching. The product is static: no server-side API or
  product-unlock endpoint exists, so rate-limit testing is not applicable.

## Release-blocking defects

### High — unknown URLs return HTTP 200, not a real 404

`curl` to `/definitely-not-a-route` on the live deployment returned **200**.
The SPA renders a styled missing-route state after JavaScript, but
`site/public/staticwebapp.config.json` contains only a navigation fallback and
no response override/404 asset. The site-structure contract explicitly
requires a real 404 route (for Azure Static Web Apps, a 404 response override
that rewrites to the styled page). This also masks broken links from clients
that do not execute JavaScript.

### High — mobile touch targets fail the required 44 by 44 px minimum

Measured on the live landing page at a 390 px viewport:

| Control | Measured CSS px |
| --- | --- |
| Header “Demo” | 36 × 44 |
| Footer “Privacy” | 46 × 20.1 |
| Footer “Terms” | 38 × 20.1 |
| Footer “Source” | 45 × 20.1 |

The acceptance contract requires 44 × 44 px targets. These are reachable with
keyboard, but are too small for touch use.

### High — visible privacy claim has no corresponding claims-sandbox entry

The landing fact says **“No accounts or telemetry.”** `.factory/claims.json`
has no claim/test with that statement. The closest entries only cover browser
demo same-origin/no-storage behaviour and CLI source network/telemetry client
code; neither asserts that the site has no accounts nor the landing statement
as made. The claims contract says every reliance-worthy landing claim needs
exactly one tagged observable test and makes an unlisted claim a failed review.

## Non-blocking verification gaps

- The required worker `verify-url.sh` is absent from this candidate (confirmed
  with `rg --files`). Equivalent live title/lang/main/alt/console checks and
  axe checks were run independently, but the required reusable verification
  script itself cannot be run.
- The existing handoff describes “33 Playwright tests passing, with one
  expected desktop skip.” Fresh verification ran 34 Playwright tests. Update
  that historical count when repairing the blockers.

## Repair and re-verification

Add a real Azure Static Web Apps 404 response override plus a deployable styled
404 document; enlarge all header/footer link hit areas to at least 44 by 44 px;
and add a precise `claims.json` entry with one `@claim:` test for the landing
privacy statement (or remove/narrow the statement). Then rerun every claim
test from a clean checkout and recheck the live status code and 390 px targets.
