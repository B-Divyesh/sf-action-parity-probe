# Action Parity Probe polish handoff

Work order: `action-parity-probe-polish-1`  
Base reviewed: `ba9a8ca50698376b22911f63dfbe030ac45ad2cf`  
Review findings: `ad107c65c1a68798599fc146815a40eae9016ede` / `.factory/review-1.md`  
Completed: 28 August 2026

## Delivered

- Reworked the one-click demo at `/?demo=1`: it is read-only, shows its banner,
  Reset demo and Install the CLI controls, and displays NONPORTABLE plus a real
  sample finding in the first 390×844 viewport.
- Added 15 registered claims and tests. The new coverage includes browser entry,
  browser/CLI sample equivalence, exit codes, probe boundary, rule coverage,
  exact profiles/aliases, and repository preservation in the CLI demo.
- Rewrote all review-flagged landing and README copy; updated the copy audit and
  verb-first catalog description.
- Completed standalone 404 metadata and header parity, then added its regression.
- Preserved the night-market runner visual system and self-hosted asset policy.

## How to run and verify

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
scripts/verify-url.sh http://127.0.0.1:4173/?demo=1
```

`npm test` passed locally: 47 tests passed and 3 desktop-only mobile checks
were skipped as designed. It includes 8 Rust tests and 39 executed Playwright
tests across desktop and 390×844 mobile. The build output is `dist/site/`.
The generated initial JS is 18.51 KB raw / 5.73 KB gzip; CSS is 12.99 KB raw /
3.61 KB gzip.

Every exact command in `.factory/claims.json` was also run from a clean clone;
all 15 passed. The clean-clone log and deployed-site check are recorded after
the repair commit in this handoff's follow-up commit.

Playwright Axe found no serious or critical issue on `/`, `/demo`, `/privacy`,
`/terms`, or `/missing-route` at both tested widths. The standalone Axe CLI
could not locate a system Chrome binary in this worker; the pinned Playwright
Axe integration is the successful accessibility evidence.

## Deploy

Publish `dist/site/` with its supplied `staticwebapp.config.json`. The config
rewrites `/demo`, `/privacy`, and `/terms`, and returns the product-specific
`404.html` with HTTP 404 for unknown URLs. Production target:
`https://action-parity-probe.sociobot.in/?demo=1`.

## Known gaps

No product findings remain. The declared product limits remain intentional:
expressions, custom actions, and reusable workflows are not expanded; profiles
are versioned snapshots; probes observe the local host rather than a remote
runner.
