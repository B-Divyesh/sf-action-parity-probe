# Action Parity Probe handoff

Work order: `action-parity-probe-repair-1`
Base candidate: `88c1966699597ddfeceda6059824ee24225fe0e2`
Completed: 28 August 2026

## Repair status

All three release-blocking findings in `.factory/verification.md` are repaired and covered by regressions. The product remains a Rust CLI with a static Vite landing and documentation site; no behavior from the accepted CLI/demo path was changed.

- **Real 404:** the Static Web Apps configuration now rewrites only the known SPA URLs (`/demo`, `/privacy`, `/terms`) to the app. Unknown paths reach `responseOverrides["404"]`, which rewrites to the new styled `404.html` and retains status 404. The document has its own CSP-compatible stylesheet, landmark structure, one h1, skip link, navigation, and return action. `static host configuration returns a styled 404 for unknown paths` asserts the exact routing policy and document.
- **44 px touch targets:** header navigation has a 44 px minimum width and height; all footer links now have 44 by 44 px minimum hit areas. At a 390 px viewport the measured visible controls are Demo 44×44, header Privacy 54×44, footer Privacy 46×44, Terms 44×44, and Source 45×44. The mobile regression test measures these boxes.
- **Claimed privacy:** `.factory/claims.json` now includes the precise `no-accounts-or-telemetry` claim. Its fresh-browser test visits `/`, `/demo`, `/privacy`, and `/terms`, verifies the landing fact, asserts there are no account fields or authentication controls, no cookies or browser storage, and only same-origin requests. README privacy wording now matches the observable behavior.
- Added `scripts/verify-url.sh` so the required reusable browser check tests title, language, one main, one h1, image alternatives, and console errors.

## Run and verify

```sh
npm ci
npm test
npm run build
cargo clippy --all-targets --all-features -- -D warnings
cargo package --allow-dirty
npm run preview -- --host 127.0.0.1
scripts/verify-url.sh http://127.0.0.1:4173/
```

The repair was verified from a clean `npm ci` install:

- `npm test`: passed. Rust: 8 tests. Playwright: 38 passed across desktop and 390 px mobile; 2 expected desktop skips for the two mobile-only checks. It runs every claim, keyboard history/focus behavior, all routes, and serious/critical axe checks. The new exact privacy-claim command also passed: `npm test -- --grep @claim:no-accounts-or-telemetry`.
- `npm run build`: passed and writes `dist/site/`. The repaired build contains 18,032 bytes JS raw / 5.62 KB gzip and 12,330 bytes CSS raw / 3.48 KB gzip.
- `cargo clippy --all-targets --all-features -- -D warnings`: passed.
- `cargo package --allow-dirty`: passed; 20 files, 67.9 KiB (19.0 KiB compressed), including package verification.
- Consumer check: installed that package into a fresh temporary Cargo root and ran its installed `action-parity-probe demo`; it produced the bundled report in a temporary directory.
- `scripts/verify-url.sh` passed for `/` and `/404.html`. Playwright axe integration found no serious or critical violations on desktop or mobile.
- Pre-deploy reproduction: the previous live unknown URL returned HTTP 200. Post-push deployment verification must confirm that same request returns HTTP 404 and that live hashed assets match this build.

The site does not claim offline browser reload support and ships no service worker, so PWA offline/update testing is not applicable. The CLI's local-only operation is covered by the `cli-privacy` source/dependency claim test.

## Product behavior and limits

- The CLI inventories workflows and compares them against four versioned runner profiles. It never executes workflow steps.
- `demo` uses bundled sample data in a temporary directory and prints the Markdown report path. The browser `/demo` is a no-storage recorded sample.
- The bundled generic-profile benchmark continues to flag 10 static errors, above the brief target of 8 out of 10 known failures.
- This remains a readiness report, not a workflow executor or a build-pass guarantee. Expressions, custom actions, and reusable workflows are inventoried but not expanded into runtime behavior.

## Release/deploy

Repair commit `3dfb9ad` was pushed to `origin/main`. Static deployment is driven from that branch with `dist/site/` as the product artifact; this repository contains no deployment workflow or deployment credential. At 14:39 UTC, the public host was still serving the prior artifact (`Last-Modified: 13:31 UTC`) and returned HTTP 200 for the verifier's unknown URL, so live 404 and hash-identity confirmation remains for the factory deployment observer after it consumes `main`. Do not publish the Cargo package from this worker. The factory owns registry and deployment credentials.
