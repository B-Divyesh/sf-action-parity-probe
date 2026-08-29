# Action Parity Probe review-4 handoff

- Work order: `action-parity-probe-review-4`
- Reviewed commit: `36b933c0d906ccf1477cdf36109074b4915d89a3`
- Completed: 29 August 2026
- Live URL: <https://action-parity-probe.sociobot.in>

## What was done

Performed the requested adversarial, no-product-code-change review and wrote
`.factory/review-4.md`. The verdict is **FAIL** with two blocking unlisted-claim
findings and two minor plain-copy findings. This handoff and the review are the
only intended repository changes.

## How verified

- Opened the live site cold at 390×844 and 1440×900 and recorded the first-read
  answers before scrolling.
- Audited every landing and README sentence, heading, label, and action.
- Exercised the one-click browser demo, visible result, Reset demo, seeded real
  storage preservation, cookies, and the full request log.
- Ran the CLI demo from an empty temporary directory and confirmed that its
  report was written to a separate temporary sandbox.
- Cloned the reviewed commit to
  `/tmp/action-parity-probe-review4-clean-YuTctH/repo`, ran `npm ci`, and ran
  all 17 exact commands from `.factory/claims.json`; all passed.
- Ran the clean-clone full `npm test` (2 Rust unit, 6 Rust CLI, and 61
  Playwright tests passed; 3 viewport skips) and `npm run build`; `dist/site/`
  was produced.
- Crawled all live routes and links, checked headers and metadata, verified
  deep links/back/focus/scroll restoration, and ran Playwright Axe on five
  routes at both widths with zero serious or critical violations.
- Ran `scripts/verify-url.sh https://action-parity-probe.sociobot.in/`; it
  passed.
- Read every earlier review, polish report, and handoff, then rechecked each
  earlier finding against the live site and current code/tests.

## Known gaps and next steps

See F-4-1 through F-4-4 in `.factory/review-4.md`. No registered claim test
failed, but PASS is blocked until the no-translation and deployment-routing
claims are registered or removed. The remaining copy should drop decorative
sequence labels and use a literal 404 heading. No offline claim exists, so an
offline interception check was not applicable.
