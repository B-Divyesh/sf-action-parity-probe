# Visual thesis: neon runner audit at a night market

## Direction and reason

The site treats runner migration like checking handwritten signs along a night
market lane. Each sign advertises a capability; the probe reveals which signs
go dark on another runner. The scene fits a technical comparison tool because
bright status marks sit against a quiet inspection surface. It does not use a
generic gradient hero or dashboard card grid.

This is an intentional dark-only treatment. Night is part of the direction,
not a theme toggle. Large ink-black fields keep long reports readable while
small neon marks carry status.

## Tokens

- `--ink: #070a0f` — night sky and page background.
- `--stall: #111823` — raised working surfaces.
- `--paper: #f4f1df` — primary copy, like warm receipt stock.
- `--muted: #b8c1c8` — secondary copy; 9.7:1 on ink.
- `--cyan: #37e6ff` — primary action and focus; 13.1:1 on ink.
- `--pink: #ff5ca8` — editorial accents and warning labels.
- `--amber: #ffc857` — cautions; 11.5:1 on ink.
- `--green: #78f7a6` — portable state; 14.1:1 on ink.
- `--red: #ff7272` — nonportable state; 7.7:1 on ink.

Status always includes a word or symbol, so color is never the only cue.

## Type and spacing

Display type uses the self-hosted `Space Grotesk` subset (SIL OFL). Report
text uses the self-hosted `IBM Plex Mono` subset (SIL OFL). The former feels
like hand-built stall signage; the latter keeps inventories aligned. The
fallbacks are system sans and monospace. The scale is 14, 16, 20, 28, 44, and
64 pixels. Spacing follows an 8-pixel base, with 4-pixel optical adjustments.
Reading measures stay below 68 characters.

## Shape and interaction grammar

Panels use clipped ticket corners rather than rounded SaaS cards. Thin cyan
rules resemble power cables. Labels hang from short horizontal stems. The
primary button is a bright rectangular sign with a two-pixel offset shadow.
Focus uses a three-pixel cyan outline plus black separation.

The signature motion is a single sign-light sequence: inventory rows turn on
from top to bottom when the demo starts. It uses only opacity and transform for
240 milliseconds. With `prefers-reduced-motion`, all rows appear at once.
Nothing loops or flashes.

## Original asset plan and provenance

- `hero-market.webp`: generated for this product with
  `/opt/fleet/lib/gen-image.sh`, using the factory `factory-image` deployment.
  Prompt: “Editorial night-market alley built from abstract CI runner racks,
  hanging cyan, magenta and amber signs, cables forming a branching workflow,
  one dark incompatible sign, deep ink background, tactile screen-print grain,
  cinematic wide composition, no people, no logos, no legible text, no
  watermark.” It is cropped for the hero and compressed to WebP under 300 KB.
  The original generated output is used under the factory generation terms;
  its sidecar JSON records the prompt, deployment, size, and quality.
- The wordmark, parity-gate favicon, report marks, and 404 power-cord drawing
  are original inline SVG/CSS geometry made in this repository.
- Open Graph art is composed locally from the generated hero and native type.

Space Grotesk and IBM Plex Mono are self-hosted under the SIL Open Font
License. Their subset files ship with the site.

Generated imagery is used as atmosphere. Required information remains live
HTML text.
