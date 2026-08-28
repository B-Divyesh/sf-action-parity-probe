# Polish round 2 — Action Parity Probe

Candidate repaired from `d9bb15fbcf3a651493240d6225b1db5e1c85d882`
using review commit `db35481f4ca712a2a79785a5efecd6b1f3b6d304`.
Implementation commit: `7ff5e2640fc810462bc230324e484898b3320235`.
Completed: 28 August 2026.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the compact mobile result directly below the demo heading. `NONPORTABLE`, counts, and the first finding remain above the 844 px fold. | `@claim:browser-demo-entry`; `.factory/evidence/polish-2-live-demo-reset-mobile.png`; cold `/?demo=1` check. |
| F-1-2 | Kept the direct “Try it with sample data” action and its one-click `?demo=1` route claim. | `@claim:browser-demo-entry`; live one-click check. |
| F-1-3 | Kept browser report generation tied to the real CLI fixture. | `@claim:browser-cli-sample`; live report check. |
| F-1-4 | The unproved minimum Rust version remains absent. | `.factory/copy-audit.md`; README audit. |
| F-1-5 | The unproved single-binary packaging claim remains absent. | `.factory/copy-audit.md`; `cargo package --allow-dirty`. |
| F-1-6 | Browser and CLI sample profile, summary, inventory, and findings remain structurally equal. | `@claim:browser-cli-sample`. |
| F-1-7 | Exit 0, 1, and 2 stay covered with portable, nonportable, and invalid inputs. | `@claim:exit-codes`. |
| F-1-8 | Probe scope still covers declared commands, shells, case behavior, Docker, and non-execution. | `@claim:probe-scope`. |
| F-1-9 | No separate temporary-directory promise remains for host probes. | README and `.factory/copy-audit.md`. |
| F-1-10 | Every named rule family still has an expected rule ID. | `@claim:rule-coverage`. |
| F-1-11 | Privacy wording remains limited to the provable absence of network and telemetry client code. | `@claim:cli-privacy`. |
| F-1-12 | Exact profile IDs and every documented alias remain asserted. | `@claim:versioned-profiles`. |
| F-1-13 | Replaced the shallow sentinel check with a recursive snapshot of hidden/nested paths, bytes, types, symlink targets, modes, sizes, and modification times. | `@claim:demo-sandbox`; fresh-clone pass. |
| F-1-14 | README introduction remains split into short direct sentences. | `.factory/copy-audit.md`. |
| F-1-15 | README demo explanation remains split into sentences of 10, 6, and 9 words. | `.factory/copy-audit.md`. |
| F-1-16 | Exit-code copy remains three short sentences. | `.factory/copy-audit.md`; `@claim:exit-codes`. |
| F-1-17 | The README names the opt-in `--probe --sandbox` boundary. | `.factory/copy-audit.md`. |
| F-1-18 | The command comment says the host check does not run workflow steps. | README; `@claim:probe-scope`. |
| F-1-19 | OpenID Connect is expanded and rule copy remains split into plain sentences. | `.factory/copy-audit.md`; `@claim:rule-coverage`. |
| F-1-20 | The step heading remains “Share the compatibility report.” | `.factory/copy-audit.md`; live landing check. |
| F-1-21 | The demo exit action remains “Install the CLI.” | `@claim:browser-demo-entry`; live mobile screenshot. |
| F-1-22 | JSON remains described as structured output for scripts. | README copy audit. |
| F-1-23 | Markdown remains described as a report to attach to a review. | README copy audit. |
| F-1-24 | The art caption names a sample workflow requirement. | `.factory/evidence/polish-2-live-landing-desktop.png`. |
| F-1-25 | The preview heading directly says it finds incompatible steps. | `.factory/evidence/polish-2-live-landing-desktop.png`. |
| F-1-26 | The standalone 404 keeps canonical, noindex, Open Graph, Twitter, favicon, and Apple metadata. | `static host configuration returns a styled 404 for unknown paths`; live `/definitely-not-a-route` returned 404. |
| F-1-27 | The 404 header keeps Demo, Install, and Privacy destinations. | Same 404 test; cold live 404 crawl. |
| F-1-28 | README retains deploy instructions for `dist/site`, SPA routes, and the real 404. | README Deploy section; production route crawl. |
| F-2-1 | Reset now restores terminal scroll, forces a new `reset-sign-on` animation, and visibly announces “Sample restored. Recording restarted.” | `@claim:demo-reset`; `.factory/evidence/polish-2-live-demo-reset-mobile.png`; cold live reset check. |
| F-2-2 | Added a self-hosted SVG recording generated during builds from a real `action-parity-probe demo` run. The landing caption names the command and temporary report path. | `@claim:terminal-recording`; `.factory/evidence/polish-2-live-landing-desktop.png`; live `/assets/terminal-recording.svg`. |
| F-2-3 | The invoking repository test now checks the full recursive tree and metadata, including hidden workflow files and nested binary content. | `@claim:demo-sandbox`; fresh-clone pass. |

## Verification evidence

- Fresh clone: `/tmp/action-parity-probe-polish-2-clean-XGdHyQ`.
- Every one of the 17 exact `.factory/claims.json` commands passed independently;
  the runner ended with `ALL_CLAIMS_PASSED=17`.
- Fresh-clone `npm test`: 8 Rust tests and 61 Playwright tests passed; 3
  viewport-specific tests were intentionally skipped in the opposite project.
- `npm run build`: JS 19,248 bytes raw / 5.94 kB gzip; CSS 13,755 bytes raw /
  3.74 kB gzip; SVG recording 2,004 bytes; hero 225,094 bytes.
- `cargo clippy --all-targets --all-features -- -D warnings`: passed.
- `cargo package --allow-dirty`: verified 20 files, 68.2 KiB / 19.2 KiB
  compressed.
- `scripts/verify-url.sh` passed the clean local `/` and `/404.html`, then the
  live equivalents.
- Playwright Axe found zero serious or critical violations on `/`,
  `/?demo=1`, `/demo`, `/privacy`, and `/terms` at 1440×900 and 390×844.
- Local Lighthouse: performance 98, accessibility 100, best practices 100,
  SEO 100; LCP 2480 ms, CLS 0, TBT 0 ms.
- Live Lighthouse: performance 98, accessibility 100, best practices 100,
  SEO 100; LCP 2269 ms, CLS 0, TBT 0 ms.
- Live JS and CSS SHA-256 values match `dist/site`: JS
  `841a3a69495661c0148beaa4831b81f01cf7cba8fb12f05c694752162e10f94c`;
  CSS `f43a2e7457eb77f7d55b577546c34a491778925d38a64f5b523017211d3e0fc8`.
- Live cold-check summary: `routes=5 viewports=2 axe=10 demo=one-click
  reset=observable recording=real 404=404 privacy=same-origin`.

All findings from reviews 1 and 2 are resolved. No severity remains open.
