# Independent verification — PASS

**Candidate:** `ba9a8ca50698376b22911f63dfbe030ac45ad2cf`  
**Verified:** 28 August 2026  
**Live URL:** https://action-parity-probe.sociobot.in  
**Verifier work order:** `action-parity-probe-verify-2`

## Decision

**PASS — release candidate accepted.** The real CLI, its bundled demo, and the
static documentation site satisfy the researched brief and the factory
contract. The fresh live deployment matches the candidate build byte-for-byte.
The three blockers in the earlier verification are repaired in this candidate;
the prior deployment-only concern is resolved by fresh live evidence.

## Required first checks

### Claims sandbox

From the clean checkout, after `npm ci` (0 vulnerabilities), every exact
command in `.factory/claims.json` passed. Each command uses the product's
bundled demo entry point and runs the Rust suite plus the relevant Playwright
claim assertion in desktop Chromium and the 390 px mobile project.

| Claim id | Exact test | Result |
| --- | --- | --- |
| `static-inventory` | `npm test -- --grep @claim:static-inventory` | PASS |
| `no-workflow-execution` | `npm test -- --grep @claim:no-workflow-execution` | PASS |
| `observed-probes` | `npm test -- --grep @claim:observed-probes` | PASS |
| `report-formats` | `npm test -- --grep @claim:report-formats` | PASS |
| `demo-sandbox` | `npm test -- --grep @claim:demo-sandbox` | PASS |
| `versioned-profiles` | `npm test -- --grep @claim:versioned-profiles` | PASS |
| `site-privacy` | `npm test -- --grep @claim:site-privacy` | PASS |
| `no-accounts-or-telemetry` | `npm test -- --grep @claim:no-accounts-or-telemetry` | PASS |
| `cli-privacy` | `npm test -- --grep @claim:cli-privacy` | PASS |
| `free-open-source` | `npm test -- --grep @claim:free-open-source` | PASS |

### Cold first read

Cold-loading the production URL at 1440 px clearly answered all three required
questions on the first screen:

- **Does:** “Check workflow differences before changing CI runners.”
- **For whom:** “For platform teams comparing local or alternate runners before
  an outage forces the move.”
- **First action:** “Try it with sample data”; adjacent text says “See a real
  report in one click.”

The action is a visible, keyboard-operable link to `/demo`. The browser demo
immediately presents the recorded report from bundled sample data and shows the
persistent “Demo — sample data, nothing is saved” banner with Reset demo and
Start for real controls. This passes the plain-words and one-click demo gate.

## Clean-build and CLI evidence

- `npm test`: **PASS** — production build, 8 Rust unit/integration tests, and
  38 Playwright tests passed; 2 desktop-only mobile assertions were correctly
  skipped. Tests include desktop and 390 px mobile axe checks with zero
  serious/critical issues.
- `cargo clippy --all-targets --all-features -- -D warnings`: **PASS**.
- `npm run build`: **PASS**, producing `dist/site/`. Initial application JS is
  18,032 bytes raw / 5.62 KB gzip and CSS is 12,327 bytes raw / 3.48 KB gzip,
  below the static-product budgets. The 225,094-byte hero WebP is below the
  300 KB mobile hero budget; self-hosted fonts total 37,996 bytes.
- `cargo package --allow-dirty`: **PASS** — 20 files, 67.9 KiB unpacked and
  19.1 KiB compressed. The packaged crate was extracted into a fresh temporary
  consumer root, installed using `cargo install --path … --root …`, and its
  installed `action-parity-probe --help` and `action-parity-probe demo` both
  worked. The latter wrote and printed a readable temporary Markdown report.

End-to-end CLI exercise:

- `demo` scanned the bundled release workflow without touching the current
  repository, labelled static versus observed findings, and preserved the
  report. In this host it reported 12 errors and 8 warnings after safe probes.
- `profiles --json` returned four profiles, all explicitly versioned
  `2026-08`.
- A normal sample check emitted valid JSON, Markdown, and SARIF; SARIF had 18
  findings. Their nonportable exit code was correctly `1`.
- Boundary and recovery cases all exited `2` with actionable errors: an empty
  repository (“no workflow files found”), malformed YAML with file/line
  context, an unknown profile directing the user to `profiles`, and `--probe`
  without `--sandbox` refusing to run.
- The regression test `flags_at_least_eight_known_cross_runner_failures`
  passed, covering the researched success threshold.

## Live deployment, responsive QA, and accessibility

- Fresh production HTML references `index-BoYTPpWx.js` and
  `index-DbfTy2Xm.css`. SHA-256 comparisons of each fetched asset against the
  fresh `dist/site` asset were identical:
  `94d0096ecec7b60a47ca345335aea120a0794a7ddd002567de9421b15b3a1d5f`
  (JS) and
  `79088c8b3b76008168fcb55bfe9ce75eb5e665cc2240cd5eaf9de5d77e22e71e`
  (CSS).
- `/`, `/demo`, `/privacy`, and `/terms` each returned 200 with route-correct
  titles, one `main`, one h1, no horizontal overflow, no console/page errors,
  and no serious/critical axe violations at 1440 px and 390 px. Visual review
  confirmed that the dark neon runner-audit design remains legible and
  intentional on both sizes; the mobile first action remains visible.
- Keyboard-only testing found the visible Skip to main content link first.
  Enter on the demo action navigated to `/demo`; the route implementation moves
  focus to the new h1 (also covered on desktop and mobile by the Playwright
  history/focus tests). The CSS supplies a 3 px cyan focus treatment and has a
  `prefers-reduced-motion: reduce` rule.
- At 390 px, Demo, Privacy, Terms, and Source all measure at least 44 px high
  and 44 px wide (respectively 44×44, 46×44, 44×44, and 45×44).
- The supplied worker check passed locally for `/` and `/404.html`:
  `scripts/verify-url.sh http://127.0.0.1:4173/` and
  `scripts/verify-url.sh http://127.0.0.1:4173/404.html`.
- All rendered internal and external links resolve successfully. Public
  support files (`robots.txt`, sitemap, icon, self-hosted fonts, hero, and OG
  image) return 200.

## Security, privacy, caching, and deployment policies

- Fresh browser contexts across landing, demo, privacy, and terms made only
  same-origin requests; cookies, `localStorage`, and `sessionStorage` stayed
  empty. No account/authentication UI exists. Static source/dependency review
  found no network, telemetry, analytics, or third-party runtime client.
- The live CSP is same-origin only (`default-src`, scripts, styles, images,
  fonts, and connections); it also sends HSTS, `nosniff`, strict-origin
  referrer policy, `frame-ancestors 'none'`, restrictive permissions policy,
  and form/base restrictions. HTML uses short revalidation caching; hashed JS
  is `public, max-age=31536000, immutable`.
- `/definitely-not-a-route` returns a real **HTTP 404** and the deployed
  styled document has its own semantic title, language, skip link, main, h1,
  and way home. This is the specific live condition that failed in the earlier
  report and now passes.
- This is a static, local-only CLI/site: it has no server-side endpoint,
  authentication, billing/unlock request, persistence boundary, or service
  worker. API burst/rate-limit, sign-in tenant, concurrency, and PWA
  offline-update checks are therefore not applicable. The site does not claim
  offline reload.
- A Lighthouse CLI attempt could not produce a score because the container's
  Chrome tab crashed; it was not treated as product evidence. The independent
  Playwright/axe checks, payload measurement, and fresh visual inspection above
  completed successfully.

## Defects by severity

No Critical, High, Medium, or Low defects found.

## Known non-blocking notes

- Navigating directly to an intentionally unknown production URL logs the
  browser's expected failed-document 404 resource message. The HTTP response
  and styled 404 content are correct; all real product routes load with no
  console/page errors.
- Do not publish the Cargo crate from this worker. The factory owns registry
  credentials. A ready-to-publish package was verified with
  `cargo package --allow-dirty`.
