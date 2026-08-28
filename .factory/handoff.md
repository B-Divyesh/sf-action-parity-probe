# Action Parity Probe review handoff

Work order: `action-parity-probe-review-1`

Reviewed candidate: `3e341ac7ce6fe2db5fe630318e1ba41ee6f317ff`

Live URL: https://action-parity-probe.sociobot.in

Completed: 28 August 2026

## Decision

**FAIL.** The complete adversarial review is in `.factory/review-1.md`.
It records 28 findings. The primary blocker is that the actual compatibility
result falls below the first 390×844 demo viewport. Additional blockers cover
unlisted or under-tested landing/README claims. Minor findings cover three
overlong README sentences, vague/jargon-heavy copy, one non-result action,
standalone 404 metadata/header parity, and missing deployment guidance.

## Verification completed

- Opened the live site cold at 390×844 and 1440×900; the landing clearly states
  what it does, for whom, and the first action.
- Ran every exact `.factory/claims.json` command from a fresh clone; all ten
  passed in desktop and mobile projects.
- Ran `npm test` from that clone: 8 Rust tests and 38 Playwright tests passed;
  2 desktop-only mobile checks were skipped as designed.
- Ran the CLI demo from an empty temporary directory; it exited 0, left the
  working directory untouched, and wrote its report under a separate temp path.
- Exercised browser demo reset, same-origin interception, cookies/storage, and
  preservation of a seeded real-data marker.
- Crawled live routes/links, checked metadata and the real HTTP 404, exercised
  history/focus, ran axe at mobile and desktop widths, measured touch targets,
  and ran `scripts/verify-url.sh` against production.
- Confirmed live JS/CSS hashes match the clean candidate build.
- Rechecked every earlier verification/handoff finding. The prior 404, mobile
  touch-target, privacy-claim, missing verifier script, and stale-count issues
  are genuinely fixed.

## Repository impact

No product code was changed. This review updates only
`.factory/review-1.md` and `.factory/handoff.md`.

## Next step

Repair every finding in `.factory/review-1.md`, add the missing claim coverage,
and repeat the whole review from a fresh clone and fresh browser contexts.
