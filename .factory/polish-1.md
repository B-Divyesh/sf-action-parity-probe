# Polish round 1 — Action Parity Probe

Candidate repaired from `ba9a8ca50698376b22911f63dfbe030ac45ad2cf` and
`ad107c65c1a68798599fc146815a40eae9016ede`. Reviewed 28 August 2026.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | The 390 px demo now puts a compact NONPORTABLE summary and sample finding above the terminal; surplus intro/count chrome is hidden only at this width. | `@claim:browser-demo-entry`; `/tmp/action-parity-probe-evidence/demo-mobile.png` |
| F-1-2 | Replaced the untested hero sentence with “Open the sample report” and registered the real one-click browser route claim. | `@claim:browser-demo-entry` |
| F-1-3 | Removed the provenance sentence and registered browser/CLI fixture equivalence. | `@claim:browser-cli-sample` |
| F-1-4 | Removed the unverified minimum Rust-version statement. | README copy audit |
| F-1-5 | Removed the single-binary packaging promise from landing and README copy. | README copy audit |
| F-1-6 | The browser and CLI sample now compare profile, summary, inventory, and findings byte-for-structure. | `@claim:browser-cli-sample` |
| F-1-7 | Registered all three documented exit outcomes against portable, nonportable, and invalid inputs. | `@claim:exit-codes` |
| F-1-8 | Registered the command, shell, case-behavior, and Docker observation boundary. | `@claim:probe-scope` |
| F-1-9 | Removed the separate temporary-directory promise for probes. | README copy audit |
| F-1-10 | Added one asserted static rule ID for each documented category. | `@claim:rule-coverage` |
| F-1-11 | Narrowed the promise to absence of telemetry/network client code, which the source/dependency test proves. | `@claim:cli-privacy` |
| F-1-12 | The claim and test now name all four profile IDs and resolve each documented alias. | `@claim:versioned-profiles` |
| F-1-13 | The CLI demo claim snapshots an invoking repository sentinel before and after running. | `@claim:demo-sandbox` |
| F-1-14 | Split the README introduction into short direct sentences. | `.factory/copy-audit.md` |
| F-1-15 | Split the demo description into three short sentences. | `.factory/copy-audit.md` |
| F-1-16 | Split the exit-code contract into three short sentences. | `.factory/copy-audit.md`; `@claim:exit-codes` |
| F-1-17 | Replaced “safe local probes” with the explicit opt-in `--probe --sandbox` boundary. | README; `.factory/copy-audit.md` |
| F-1-18 | Rewrote the command comment to state that workflow steps do not run. | README |
| F-1-19 | Expanded OIDC and rewrote the rule description as short plain-language sentences. | README |
| F-1-20 | Renamed “Carry the report” to “Share the compatibility report.” | landing screenshot and `.factory/copy-audit.md` |
| F-1-21 | Renamed the demo action to “Install the CLI.” | `@claim:browser-demo-entry` screenshot |
| F-1-22 | Rewrote JSON output as “structured output for scripts.” | README |
| F-1-23 | Rewrote Markdown output as an attachment-ready review report. | README |
| F-1-24 | Rewrote the hero caption around the sample workflow requirement. | `.factory/copy-audit.md` |
| F-1-25 | Rewrote the preview heading around incompatible steps. | `.factory/copy-audit.md` |
| F-1-26 | Added canonical, OG, Twitter, and apple-touch metadata to the standalone 404. | `static host configuration returns a styled 404 for unknown paths` |
| F-1-27 | Added the Install destination to the standalone 404 header. | `static host configuration returns a styled 404 for unknown paths` |
| F-1-28 | Added a deployment section describing `dist/site/`, the host config, routes, and unknown-route check. | README |

## Evidence

- `npm test`: 47 passed, 3 expected desktop-only skips. This includes Rust,
  generated browser fixture, desktop/mobile Playwright, privacy interception,
  focus/history, route/404 metadata, and Playwright Axe checks.
- `scripts/verify-url.sh http://127.0.0.1:4173/?demo=1`: passed.
- `@axe-core/playwright` found no serious or critical issues on `/`, `/demo`,
  `/privacy`, `/terms`, and `/missing-route` at both tested viewports.
- Screenshot evidence: `/tmp/action-parity-probe-evidence/demo-mobile.png` and
  `/tmp/action-parity-probe-evidence/demo-desktop.png`.
- Clean-clone evidence: `/tmp/action-parity-probe-clean-gu83jm` ran `npm ci`,
  all 15 exact claim commands from `.factory/claims.json`, `npm test`, and
  `npm run build` successfully.
