# Polish round 4 — Action Parity Probe

Repair commit: `2c489078e4c176dfe52dbd2aface3785bd69ff85`.
Reviewed report: `1a8577e9d8703f760ead63a25e3503968c59896c`.
Deployed: 29 August 2026 to <https://action-parity-probe.sociobot.in>.

## Finding map

Every visual or routing row was rechecked in a cold production context at the
listed live URL. Nonvisual rows cite their exact claim test or the copy audit.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the compact sample result and first finding in the initial 390 px demo viewport. | `@claim:browser-demo-entry`; [live mobile demo](https://action-parity-probe.sociobot.in/?demo=1); `.factory/evidence/polish-4-live-demo-mobile.png`. |
| F-1-2 | Kept the direct sample-data action and one-click `?demo=1` entry. | `@claim:browser-demo-entry`; live one-click check. |
| F-1-3 | Kept browser fixture generation tied to the real CLI sample. | `@claim:browser-cli-sample`; live demo report check. |
| F-1-4 | Left the unverified minimum-Rust statement removed. | `.factory/copy-audit.md`; clean-clone README audit. |
| F-1-5 | Left the unverified single-binary promise removed. | `.factory/copy-audit.md`; `cargo package --allow-dirty`. |
| F-1-6 | Kept structural browser/CLI sample equality. | `@claim:browser-cli-sample`; live demo report check. |
| F-1-7 | Kept controlled exit-code coverage for 0, 1, and 2. | `@claim:exit-codes`. |
| F-1-8 | Kept declared-command, shell, case, Docker, and non-execution probe coverage. | `@claim:probe-scope`. |
| F-1-9 | Left the separate host-probe temporary-directory promise removed. | README and `.factory/copy-audit.md`. |
| F-1-10 | Kept an asserted rule ID for every documented rule family. | `@claim:rule-coverage`. |
| F-1-11 | Kept CLI privacy wording limited to source/dependency behavior the test observes. | `@claim:cli-privacy`. |
| F-1-12 | Kept exact profile IDs and aliases under test. | `@claim:versioned-profiles`. |
| F-1-13 | Kept recursive preservation checks for hidden/nested files, links, bytes, modes, sizes, and mtimes. | `@claim:demo-sandbox`. |
| F-1-14 | Kept short README introduction sentences. | `.factory/copy-audit.md`. |
| F-1-15 | Kept short README demo sentences. | `.factory/copy-audit.md`. |
| F-1-16 | Kept the exit contract as three short sentences. | `.factory/copy-audit.md`; `@claim:exit-codes`. |
| F-1-17 | Kept the explicit `--probe --sandbox` boundary. | README; `.factory/copy-audit.md`. |
| F-1-18 | Kept the host-check comment that workflow steps do not run. | README; `@claim:probe-scope`. |
| F-1-19 | Kept expanded OIDC and split rule language. | README; `@claim:rule-coverage`. |
| F-1-20 | Kept “Share the compatibility report.” | Landing copy audit; live landing. |
| F-1-21 | Kept “Install the CLI” as the demo exit action. | `@claim:browser-demo-entry`; `.factory/evidence/polish-4-live-demo-mobile.png`. |
| F-1-22 | Kept JSON described as structured output for scripts. | README; `.factory/copy-audit.md`. |
| F-1-23 | Kept Markdown described as a review attachment. | README; `.factory/copy-audit.md`. |
| F-1-24 | Replaced the remaining art metaphor with the tested sample identity: `release.yml` against `act`. | `@claim:browser-cli-sample`; `.factory/evidence/polish-4-live-landing-desktop.png`. |
| F-1-25 | Kept the direct incompatible-steps preview heading. | Landing copy audit; live landing. |
| F-1-26 | Kept complete standalone 404 metadata and now verifies its real HTTP response through the SWA emulator. | `@claim:static-routing`; [live 404](https://action-parity-probe.sociobot.in/missing-route); `.factory/evidence/polish-4-live-404-mobile.png`. |
| F-1-27 | Kept the standalone 404 header destinations. | `@claim:static-routing`; live 404 check. |
| F-1-28 | Kept deploy instructions and registered the route/404 behavior as a claim. | `@claim:static-routing`; README. |
| F-2-1 | Kept Reset demo restoring scroll and visibly restarting row animation. | `@claim:demo-reset`; `.factory/evidence/polish-4-live-demo-reset-mobile.png`. |
| F-2-2 | Kept the self-hosted real CLI terminal recording. | `@claim:terminal-recording`; live landing. |
| F-2-3 | Kept the recursive demo repository snapshot. | `@claim:demo-sandbox`. |
| F-4-1 | Added `read-only-check`: it snapshots a realistic repository before normal and sandbox-probe checks and compares paths, bytes, types, links, modes, sizes, and mtimes. README now states the exact boundary. | `@claim:read-only-check`; clean-clone claim pass. |
| F-4-2 | Added `static-routing`, changed Playwright to the Azure Static Web Apps emulator, and asserts 200 deep routes plus a styled HTTP 404. | `@claim:static-routing`; [live demo](https://action-parity-probe.sociobot.in/demo), [live privacy](https://action-parity-probe.sociobot.in/privacy), [live terms](https://action-parity-probe.sociobot.in/terms), live 404 status 404. |
| F-4-3 | Removed decorative numeric overlines, process numbers, “Start for real,” and metaphor-led caption; retained direct “CLI demo” and “Limits” labels. | `.factory/copy-audit.md`; `.factory/evidence/polish-4-live-landing-desktop.png`; live landing. |
| F-4-4 | Changed both SPA fallback and standalone 404 to “Page not found” with direct recovery copy. | `@claim:static-routing`; `.factory/evidence/polish-4-live-404-mobile.png`; live 404 status 404. |

## Verification evidence

- Fresh clone: `/tmp/action-parity-probe-polish-4-clean-o5pe8y/repo`.
- All 19 exact commands listed in `.factory/claims.json` passed independently:
  `ALL_CLAIMS_PASSED=19`.
- Fresh-clone `npm test`: 2 Rust unit tests, 6 Rust CLI tests, and 65
  Playwright tests passed; 3 desktop/mobile opposite-project skips are
  intentional.
- Fresh-clone `npm run build` produced `dist/site/`.
- Current-artifact `cargo clippy --all-targets --all-features -- -D warnings`
  and `cargo package --allow-dirty` passed.
- Production build payload: JavaScript 19,028 bytes raw / 5,897 bytes gzip;
  CSS 13,565 bytes raw / 3,716 bytes gzip; hero 225,094 bytes; terminal
  recording 2,004 bytes.
- `scripts/verify-url.sh` passed live `/`, `/demo`, `/privacy`, and `/terms`.
- Cold live Playwright Axe checks found zero serious or critical violations on
  `/`, `/demo`, `/privacy`, `/terms`, and `/missing-route` at 1440×900 and
  390×844. The unknown route returned HTTP 404 at both widths.
- Live demo check: one click reached `?demo=1`; the banner, result, and first
  finding appeared above the 844 px fold; Reset demo restored scroll and used
  `reset-sign-on`; request interception recorded only the product origin; no
  cookie, localStorage, or sessionStorage value was created.
- Live Lighthouse: performance 99, accessibility 100, best practices 100,
  SEO 100; LCP 2254 ms, CLS 0, TBT 0 ms.

## Final evidence views

- `.factory/evidence/polish-4-live-landing-desktop.png`
- `.factory/evidence/polish-4-live-demo-mobile.png`
- `.factory/evidence/polish-4-live-demo-reset-mobile.png`
- `.factory/evidence/polish-4-live-404-mobile.png`

No finding remains open.
