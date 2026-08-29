# Action Parity Probe polish-4 handoff

- Work order: `action-parity-probe-polish-4`
- Repair commit: `2c489078e4c176dfe52dbd2aface3785bd69ff85`
- Deployed URL: <https://action-parity-probe.sociobot.in>
- Deployment: Azure Static Web Apps production deployment
  `9840b81c-1ed8-42ec-8a8e-71a12165f9ad`
- Completed: 29 August 2026

## What changed

- Registered and implemented two missing claim tests: repository read-only
  analysis, including `--probe --sandbox`, and static-host routing with a real
  HTTP 404.
- Switched site browser tests from Vite preview to the Azure Static Web Apps
  emulator so route assertions exercise `staticwebapp.config.json`.
- Rewrote the remaining decorative landing labels and sample caption in direct
  language without changing the neon night-market visual system.
- Corrected both the SPA fallback and standalone 404 to say “Page not found.”
- Updated the copy audit, catalog description, claim registry, evidence
  screenshots, and the cumulative finding map in `.factory/polish-4.md`.

## How to run and verify

```sh
npm ci
npm test
npm run build
cargo clippy --all-targets --all-features -- -D warnings
cargo package --allow-dirty
scripts/verify-url.sh http://127.0.0.1:4173/
```

The Playwright server is the Azure Static Web Apps emulator and therefore
tests `/demo`, `/privacy`, `/terms`, and the actual HTTP 404 behavior against
the built artifact. Run every exact command in `.factory/claims.json` from a
fresh clone for the claim contract.

## Evidence

- Fresh clone `/tmp/action-parity-probe-polish-4-clean-o5pe8y/repo`: all 19
  registered claim commands passed independently; its full `npm test` passed
  2 Rust unit tests, 6 Rust CLI tests, and 65 browser tests, with 3 intentional
  viewport skips. `npm run build` passed.
- Current artifact: clippy and package verification passed. Built JavaScript
  is 5,897 bytes gzip and CSS is 3,716 bytes gzip.
- Live cold contexts checked all five routes at 1440×900 and 390×844. Axe
  found zero serious or critical violations; `scripts/verify-url.sh` passed
  home, demo, privacy, and terms; the unknown route returned HTTP 404.
- Live demo requests were same-origin only, created no browser storage, and
  showed its result above the 390×844 fold. Reset demo reset scroll and replayed
  the sample rows. Live Lighthouse scored 99 performance, 100 accessibility,
  100 best practices, and 100 SEO (LCP 2254 ms, CLS 0, TBT 0 ms).

See `.factory/polish-4.md` for every review finding and its evidence. The
screenshots are under `.factory/evidence/polish-4-live-*.png`.

## Known gaps and next steps

None. There is no offline behavior claim, service worker, account, telemetry,
or networked product action to carry into a separate offline or privacy flow.
