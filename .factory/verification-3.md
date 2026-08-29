# Independent verification 3 — PASS

- Work order: `action-parity-probe-verify-3`
- Candidate commit: `e46ad9a434f46b01be627793d7b59f57881d4ff1`
- Verified URL: <https://action-parity-probe.sociobot.in>
- Date: 29 August 2026
- Verdict: **PASS**. No release-blocking defect was found. The live deployment
  is byte-for-byte the built candidate artifact.

## First-read result

Opened the production landing page in a new desktop browser context before
performing product interactions. It says: “Check workflow differences before
changing CI runners.” It identifies “platform teams comparing local or
alternate runners before an outage forces the move,” and its first primary
action is **Try it with sample data**, followed by “Open the sample report.”
This answers what it does, who it is for, and what to do first in plain words.
The one-click action opened `/?demo=1` and the isolated report.

## Claim contract

From this clean checkout, I ran `npm ci`, then every exact `test` command in
`.factory/claims.json` through its declared demo entry point. All 19 passed:

| Claim IDs | Result |
| --- | --- |
| `static-inventory`, `no-workflow-execution`, `read-only-check`, `observed-probes`, `report-formats` | PASS |
| `demo-sandbox`, `versioned-profiles`, `browser-demo-entry`, `browser-cli-sample`, `terminal-recording`, `demo-reset` | PASS |
| `exit-codes`, `probe-scope`, `rule-coverage`, `site-privacy`, `no-accounts-or-telemetry` | PASS |
| `cli-privacy`, `free-open-source`, `static-routing` | PASS |

The registry exists and contains 19 testable claims. The command loop reached
and completed the final `static-routing` command without a failure. The
independent full suite then completed successfully as well.

## Local build and package checks

All commands were run at candidate `e46ad9a…`:

```text
npm ci                                             PASS (0 vulnerabilities)
npm test                                           PASS
npm run build                                      PASS; dist/site produced
cargo clippy --all-targets --all-features -- -D warnings  PASS
cargo fmt --check                                  PASS
cargo package --allow-dirty                        PASS; 20 files, 68.2 KiB
npm audit --omit=dev --audit-level=high            PASS; 0 vulnerabilities
```

`npm test` ran the production build, 2 Rust unit tests, 6 Rust CLI integration
tests, and the 68-test Playwright suite (65 assertions passed and 3 intentional
mobile-only skips). The production bundle is 5,887 bytes gzip of JavaScript
and 3,708 bytes gzip of CSS; the 225,094-byte WebP hero is below the 300 KB
mobile image budget. No typecheck or lint script exists beyond Rust clippy.

I installed the `cargo package` unpacked source into a fresh temporary consumer
root and exercised its installed public binary (`--help`, `profiles --json`,
`demo`, and `check`). It installed and worked. `check` gave the bundled sample
profile `act-nektos-ubuntu-22.04@2026-08`, 6 errors and 8 warnings (exit 1);
a minimal `ubuntu-24.04` workflow produced 0 errors/warnings (exit 0); a
missing path and `--probe` without `--sandbox` returned exit 2. With
`--probe --sandbox`, the sample produced observed command, filesystem, and
Docker observations without executing its workflow steps.

## Live deployment, privacy, and accessibility

- Built `index.html` and every deployed asset had identical SHA-256 values:
  HTML, CSS, JS, source map, hero/OG images, CLI terminal recording, and demo
  fixture. This is fresh evidence that the live deployment matches the
  candidate build, not a stale deployment.
- Desktop (1440×900) and mobile (390×844) checks of `/`, `/demo`, `/privacy`,
  `/terms`, and `/missing-route` all had exactly one `h1`, a `main` landmark,
  and no horizontal overflow. The four product routes returned 200; the
  unknown route returned the designed HTTP 404.
- Axe found **zero serious or critical violations** on every one of those ten
  live page/viewport combinations. There were no page errors or unexpected
  console errors; the browser's expected failed-resource message on the
  deliberate 404 was excluded.
- Keyboard checks: the first Tab reaches “Skip to main content”; the primary
  demo action is operable with Enter and has `rgb(55, 230, 255) solid 3px`
  focus outline. The demo Reset button works by keyboard/browser activation.
  At `prefers-reduced-motion: reduce`, its row animation duration is `0.00001s`.
- The live demo displayed its persistent “Demo — sample data, nothing is
  saved” banner, reported its nonportable result, reset successfully, created
  no cookies or local/session storage, and made requests only to
  `https://action-parity-probe.sociobot.in`. No account or sign-in surface is
  present.
- `scripts/verify-url.sh https://action-parity-probe.sociobot.in/` passed.
  Every rendered link returned 200 after redirects except the current 404
  page's own skip-link URL, which correctly remains HTTP 404.
- Response headers on pages include `Content-Security-Policy` restricted to
  `'self'` (including `connect-src 'self'` and `frame-ancestors 'none'`),
  `X-Content-Type-Options: nosniff`, strict referrer policy, HSTS, and a
  restrictive Permissions-Policy. Hashed JS and CSS use
  `public, max-age=31536000, immutable`; pages use a short 30-second
  revalidation cache.

The product is static: it has no server-side product endpoint, sign-in, PWA,
or service worker, so rate-limit, tenant, service-worker update, concurrency,
and persistence-boundary checks are not applicable. A Lighthouse CLI attempt
could not complete because the supplied Chromium process crashed during
Lighthouse's full-page screenshot after collecting artifacts; this was a local
runner failure, not a product console/page error. Bundle budgets, live browser
checks, headers, and axe coverage above passed independently.

## Defects

None found (critical: 0, high: 0, medium: 0, low: 0).
