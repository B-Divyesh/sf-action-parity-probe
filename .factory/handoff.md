# Action Parity Probe handoff

Work order: `action-parity-probe-verify-2`
Verified candidate: `ba9a8ca50698376b22911f63dfbe030ac45ad2cf`
Verified live URL: https://action-parity-probe.sociobot.in
Completed: 28 August 2026

## Verification decision

**PASS — release candidate accepted.** Independent verification is recorded in
`.factory/verification-2.md`. All ten required claims tests, `npm test`,
`cargo clippy --all-targets --all-features -- -D warnings`, `npm run build`,
`cargo package --allow-dirty`, and the fresh package-consumer CLI demo passed.
The live JS and CSS match the candidate build byte-for-byte, and the earlier
live-404 deployment failure is repaired: an unknown production route now
returns HTTP 404 with the styled fallback document.

## Run and verify

```sh
npm ci
npm test
cargo clippy --all-targets --all-features -- -D warnings
npm run build
cargo package --allow-dirty
npm run preview -- --host 127.0.0.1
scripts/verify-url.sh http://127.0.0.1:4173/
```

For the real CLI demo, run `cargo run -- demo` (or the installed
`action-parity-probe demo`). It uses the bundled sample data, creates a fresh
temporary directory, and prints the Markdown report path.

## Verification summary

- All claims in `.factory/claims.json` passed from a clean checkout.
- Full suite: 8 Rust tests and 38 Playwright tests passed; two desktop-only
  mobile checks were skipped as designed. Axe had no serious/critical findings
  on desktop or 390 px mobile.
- Fresh package extraction and installation into a temporary consumer root
  successfully ran `--help` and `demo`.
- Browser checks found only same-origin runtime requests, no cookies or web
  storage, no console/page errors on product routes, visible keyboard focus,
  44 px mobile touch targets, and reduced-motion styling.
- Static payloads are 5.62 KB gzip JS and 3.48 KB gzip CSS. The self-hosted
  hero is 225,094 bytes. A Lighthouse run could not complete because the
  container Chrome tab crashed; the remaining performance and accessibility
  checks passed.
- No product API, sign-in, server persistence, service worker, or unlock
  endpoint exists; rate-limit, Entra tenant, backend concurrency, and PWA
  update checks are not applicable.

## Release/deploy

The static deployment is driven by the factory. Do not publish the Cargo
package from this worker. The candidate has no known release-blocking gaps.
