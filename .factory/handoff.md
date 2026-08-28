# Action Parity Probe polish-2 handoff

- Work order: `action-parity-probe-polish-2`
- Base review commit: `db35481f4ca712a2a79785a5efecd6b1f3b6d304`
- Repaired candidate: `d9bb15fbcf3a651493240d6225b1db5e1c85d882`
- Implementation commit: `7ff5e2640fc810462bc230324e484898b3320235`
- Completed: 28 August 2026
- Live URL: <https://action-parity-probe.sociobot.in>

## What changed

- Made **Reset demo** observable and functional. It restores report scroll,
  restarts the terminal-row recording, and announces the restored state.
- Added a small self-hosted SVG terminal recording generated from the real
  `action-parity-probe demo` output on every full build.
- Expanded the CLI demo preservation claim from a root sentinel to a recursive
  tree snapshot covering hidden and nested entries, bytes, types, symlinks,
  permissions, sizes, and modification times.
- Added exact claims and browser tests for the terminal recording and reset.
- Added route-level regression tests for titles, descriptions, canonicals,
  Open Graph/Twitter fields, shared header/footer links, and deep routes.
- Re-audited every review-1 finding, refreshed all landing/README copy counts,
  updated the demo/design contracts, and replaced the catalog sentence with a
  verb-first description under 120 characters.
- Preserved the dark neon night-market identity and original deployment class.

## How to run

```sh
npm ci
npm test
npm run build
cargo clippy --all-targets --all-features -- -D warnings
cargo package --allow-dirty
npm run preview -- --host 127.0.0.1
scripts/verify-url.sh http://127.0.0.1:4173/
```

The static deployment artifact is `dist/site/`. Do not publish the Cargo crate
from a worker; the factory owns registry credentials.

## Verification

- A fresh clone at `/tmp/action-parity-probe-polish-2-clean-XGdHyQ` ran all 17
  exact claim commands from `.factory/claims.json`; all passed.
- Fresh-clone `npm test` passed 8 Rust tests and 61 Playwright tests. Three
  viewport-specific tests skipped only in their opposite browser project.
- The browser suite covers demo isolation/reset, same-origin privacy, empty
  browser storage/cookies, one-click mobile result visibility, keyboard
  focus/history, metadata, 44 px touch targets, the real 404 contract, and Axe.
- Fresh-clone `npm run build`, clippy with warnings denied, and Cargo package
  verification all passed. The crate package contains 20 files and is 19.2 KiB
  compressed.
- Production payload: JS 19,248 bytes raw / 5.94 kB gzip; CSS 13,755 bytes raw
  / 3.74 kB gzip; hero image 225,094 bytes; terminal SVG 2,004 bytes.
- Local Lighthouse scored 98 performance, 100 accessibility, 100 best
  practices, and 100 SEO. LCP was 2480 ms, CLS 0, and TBT 0 ms.
- Live Lighthouse scored 98 performance, 100 accessibility, 100 best
  practices, and 100 SEO. LCP was 2269 ms, CLS 0, and TBT 0 ms.
- The worker URL verifier passed both local and live `/` and `/404.html`.
- Cold production checks covered five routes at 1440×900 and 390×844 with zero
  serious/critical Axe findings, console errors, third-party requests, cookies,
  stored browser data, or horizontal overflow.
- Production returned HTTP 404 for `/definitely-not-a-route`. Its metadata and
  route back to the product passed.
- Live bundle hashes match the deployed `dist/site` artifact: JS
  `841a3a69495661c0148beaa4831b81f01cf7cba8fb12f05c694752162e10f94c`;
  CSS `f43a2e7457eb77f7d55b577546c34a491778925d38a64f5b523017211d3e0fc8`.

Screenshots:

- `.factory/evidence/polish-2-live-landing-desktop.png`
- `.factory/evidence/polish-2-live-demo-reset-mobile.png`
- `.factory/evidence/polish-2-demo-mobile.png`

## Deployment

Built with the work-order command `npm ci && npm run build:site`, then deployed
with `/opt/fleet/lib/deploy-static.sh action-parity-probe dist/site`.
Deployment ID: `9a9a0bec-2498-4fd7-a0f9-c07cf24433f9`. The custom domain returned
200 immediately after deployment.

## Known gaps and next steps

None. The product makes no offline web-app claim and has no service worker, so
PWA offline-update testing is not applicable. The CLI remains fully local and
requires no network client. All findings in `.factory/review-1.md` and
`.factory/review-2.md`, including minor findings, are resolved.
