# Asset and content sources

Original assets were retrieved from Eda’s website on November 20, 2026 for her authorized website project. These are reference and production assets for this project, not a grant of unrelated reuse rights.

| Local asset | Original URL |
|---|---|
| `public/images/buidlguidl-batches.webp` | https://www.edatweets.com/assets/thumbnails/batches-onboarding-960.webp |
| `public/images/shipping-log.webp` | https://www.edatweets.com/assets/thumbnails/bg-shipping-log-36-460.webp |
| `public/images/web2-to-web3.webp` | https://www.edatweets.com/assets/thumbnails/talk-web3-480.webp |
| `public/images/hyperlane-mcp-demo.webp` | https://www.edatweets.com/assets/thumbnails/demo-hyperlane-opening-960.webp |
| `public/images/ethgunu-team.jpg` | https://www.edatweets.com/assets/g-team.jpg |
| `public/images/builder-show.webp` | https://www.edatweets.com/assets/thumbnails/builder-show-wide-960.webp |
| `public/images/eda-cryptist.webp` | https://www.edatweets.com/assets/g-cryptist-speaking.webp |
| `public/images/logos/hyperlane.png` | https://www.edatweets.com/assets/logos/hyperlane.png |
| `public/images/logos/ethereum.png` | https://www.edatweets.com/assets/logos/ethereum.png |
| `public/images/logos/world-bank.svg` | https://www.edatweets.com/assets/logos/world-bank.svg |
| `public/images/logos/cisco.svg` | https://www.edatweets.com/assets/logos/cisco.svg |
| `public/images/logos/buidlguidl.svg` | https://buidlguidl.com/assets/logo-white.svg |

Experience logos were added at Eda’s request and identify her background, not studio clients or endorsements. The Ethereum Foundation experience is described on her source site as an EF grantee working with BuidlGuidl. The first-person About copy is from https://www.edatweets.com/.

## Design references

- [Jakub Krehel’s Better UI](https://github.com/jakubkrehel/skills/tree/672ae44ace6aaed65b86cbb1e2fd6fbea0e79578/skills/better-ui): read directly from the upstream skill and its surfaces/icons references. Applied concentric corners, exact neutral image outlines, dark shadow rings with forced-color borders, optical button padding, consistent icon strokes, and hover gating.
- [Emil Kowalski’s design-engineering guidance](https://github.com/emilkowalski/skills/blob/64eb3deb9a5fbfa041faf783e0bc3fd635872e9c/skills/emil-design-eng/SKILL.md): read directly from the upstream skill. Applied interruptible CSS transitions, responsive press feedback, trigger-origin menu motion with faster exits, compact entrance staggering, immediate keyboard interactions, and reduced-motion safeguards. No animation dependency was added. The linked upstream skills are not installed plugins; their source guidance was applied directly.

| Before | After | Why |
| --- | --- | --- |
| Independent 8px header and 4px button corners | 11px outer radius, 4px inner radius, 6px inset and 1px border | Concentric corners make the floating header coherent. |
| Ungated hover selectors and long interaction transitions | Hover-capable pointer gating and 140–250ms menu/button/image feedback | Touch does not retain accidental hover styling; feedback follows intent. |
| No button press response | 160ms transition to 0.97 scale on pointer press | A small, interruptible acknowledgement without delaying the action. |
| Small uniform hero type | Responsive 36–68px headline with warm-sand emphasis | A clear pitch leads; service copy and the three pillars are unchanged. |
| Global Escape handler redirected focus even with a closed menu | Escape is handled only inside an open header menu | Unrelated keyboard actions keep their focus. |

- https://www.pinterest.com/pin/1107181889670836129/: Eda’s Services scroll-motion reference, showing a sticky feature presentation and scroll-driven emphasis. Adapted with original service text, native scrolling, and static reduced-motion/no-JavaScript fallbacks; no reference artwork or footage is shipped.

- https://www.withghost.co/: Eda’s reference for a direct, studio-led content flow; adapted as pitch → proof → founder → services → engagement → contact, without copying its claims, team, prices, clients, or testimonials.

- `docs/approved-mockup.png`: generated design mockup approved in this conversation. Use for layout and brand direction only. Its rasterized text and recreated photos must not be used as production assets.
- `docs/testimonial-reference.png`: user-provided screenshot of a testimonial-wall style. Use its layout and card treatment only. Its people and quotes are not endorsements of Eda or this studio.

## Content sources

- https://www.edatweets.com/work/
- https://www.edatweets.com/experience/
- https://www.edatweets.com/work-with-me/

Project descriptions and links in `content/projects.json` are grounded in these pages as read on November 20, 2026. All initial projects are prior work led or co-created by the founder.

## Typography inspection

The live Skroll page was inspected on November 20, 2026, with an off-white `#FCFCFC` background, gray `#616161` navigation, black buttons, and a compact centered floating header. After trying that palette, Eda chose to restore the dark theme with warm-sand accents while keeping the compact centered header. E.A. Labs retains its own wordmark, navigation, and contact destination; no Skroll artwork, prices, or claims are reused.

On https://skroll.studio/#work, browser-computed styles showed Inter for the hero and supporting copy. Hero: weight 500, 19px, 28px line height, 0.08px letter spacing at the inspected desktop viewport. Supporting text: weight 400, 15px, 24px line height. Use the same font family and weights, with the readable responsive sizes specified in the build brief. These are observed values, not a demand to copy every size.

## Testimonials

No real quotes or X post URLs have been provided. `content/testimonials.json` intentionally contains an empty list. Do not infer endorsements from previous employers or copy the reference screenshot’s quotes.
