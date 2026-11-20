# Devin build prompt: startup growth studio

Build a complete, polished, responsive studio website in this repository. Implement it, run the checks, inspect it in a browser, and open a pull request with screenshots. This is a new business website, separate from edatweets.com. Do not change that existing site or its deployment.

## Business and approved positioning

The working company name is **Ship & Tell Studio**. The GitHub repository name is **startup-growth-studio**. Both can change. Eda Akturk is the solo founder. The studio may partner with other specialists as it grows, but there is no confirmed wider team to display.

Lead with the business, services, and work. Eda belongs in the About section. Use a studio voice ("we") without implying employees or partners who do not exist.

Keep this hero copy exactly:

**A growth studio for technical startups.**

We turn complex ideas into clear stories that help people understand your product and start using it.

Buttons: **Let's talk** and **Explore our services**.

## References and precedence

- `docs/approved-mockup.png`: approved dark visual direction, company positioning, and section structure.
- `docs/testimonial-reference.png`: testimonial-card styling and staggered columns only. Never copy the quotes, people, or endorsements from this image.
- https://skroll.studio/#work: typography, restraint, floating navigation, work browsing, and motion inspiration.
- https://www.robably.net/: confident typography and work presentation.
- https://www.meetfibe.com/: human proof and testimonial-wall inspiration.
- https://www.edatweets.com/: source for founder facts and original work.

**This written brief overrides the static mockup where they differ.** In particular, use Inter, replace the static work grid with the interactive carousel below, and add the testimonial section. Treat the mockup as a design reference, never as a background image or flattened webpage.

## Typography and visual direction

Skroll's rendered hero and supporting paragraph were inspected on November 20, 2026. Both use **Inter**. Its hero uses weight 500; supporting copy uses weight 400. Use the real Inter font throughout, self-hosted through the framework's font support or official font assets, rather than a lookalike or a font copied out of Skroll's private asset bundle. Follow the font's license.

Aim for Skroll's restrained typography and spacing, translated into dark mode. Use approximately 32–40px desktop hero text, 26–32px mobile, and 16–18px body text. Keep normal text readable and avoid huge headlines filling the viewport. Use weight 500 for most headings, 400 for body, and 600 only where needed.

Palette: charcoal `#101110`, warm white `#F0EFE7`, muted text around `#B8BBB4`, subtle rules around `#353732`, restrained pale chartreuse `#DDEFA7`. Confirm contrast in the final implementation.

Use a centered, spacious hero; generous section spacing; thin dividers; understated rounded corners; and a simple text wordmark "ship & tell" with a small "STUDIO" label. Avoid stock illustrations, heavy shadows, giant pill cards, glowing gradients, and a generic dashboard appearance. Dark mode is the initial scope.

## Page structure and exact content

### Header

Company wordmark, then Services, Work, Testimonials, About, and a Let's talk button. Use a compact floating/sticky header inspired by Skroll. Anchor navigation must account for its height. On mobile, provide an accessible menu with proper open/close behavior.

### Hero

Use the approved heading, description, and two actions above. Do not put a founder portrait, personal name, or invented client logos in the hero.

### Services

Heading: **How we help**

- **Strategy & launches**  
  Positioning, launch plans, and a clear direction for growth.
- **Content & onboarding**  
  Technical articles, demos, and docs that make your product easier to understand and use.
- **Community & partnerships**  
  Developer programs, workshops, and content partnerships that bring the right people closer.

Use three columns with fine separators on desktop and a clean vertical arrangement on mobile.

### Work carousel

Heading: **Work behind the studio**

Context line: **Selected projects led or co-created by our founder.**

Use the six real projects in `content/projects.json`. Their original images are bundled in `public/images/`. Preserve each project's real role and destination. In particular, the Hyperlane MCP was community-built; Eda created the bounty program and demonstrated the project. Do not claim she built the MCP itself.

The carousel is an important part of the experience:
- Wide visual cards, roughly two to three visible on desktop and one plus a peek of the next on mobile. Use short titles and categories in the moving state.
- A gentle, seamless horizontal glide while visible, roughly 20–30px per second; no fast slide snapping every few seconds.
- A clearly labeled Pause/Play control and Previous/Next controls. Drag and swipe work naturally.
- **Stopping the carousel reveals project details.** Hovering or keyboard-focusing a card pauses motion and reveals that card's role, short description, and View project link. Pressing Pause reveals the selected card's details. Tapping a card on mobile pauses and selects it.
- Use a stable-height detail area or accessible overlay so revealing details does not shift the whole page. Keep the original work image visible.
- Manual Pause persists until Play is chosen. Hover/focus pauses must not override manual Pause. Moving focus into a card's link must never restart motion.
- Never require hover to get essential information. Keyboard and touch users must get the same content.
- Pause offscreen, in a hidden tab, and while a detail panel is open. Reduced-motion preference starts paused with manual browsing available.
- Keep loop clones out of the accessibility tree and tab order. Avoid announcing every moving card to screen readers. Provide a readable static fallback if JavaScript is unavailable.

### Testimonials

Place the testimonial section after work and before the engagement/About sections.

Heading: **In their words.**

Supporting label for initial founder testimonials: **Feedback on our founder's work.**

Use the supplied screenshot as the visual reference: dark outlined cards, generous padding, rounded corners, varied card heights, author portraits, and understated names and handles. On desktop, create a staggered three-column wall with slow vertical movement and subtle top/bottom fades. Adjacent columns may move in opposite directions. On mobile, use a single horizontal swipeable carousel.

Most entries will come from real X/Twitter posts. Each card should support quote text, author name, handle, avatar, optional role/company, original post URL, optional date, and whether the quote concerns founder work or studio work. Link "View original post" to the real source. Do not fetch X through a client-side API, require X login, or embed numerous heavy widgets. Curated cards with source links are sufficient.

Pause all testimonial motion on hover or focus within the wall, and provide a visible Pause/Play control. Swipe/keyboard navigation must work on mobile. Respect reduced motion, offscreen pausing, tab visibility, and a persistent manual Pause state.

**No testimonial quotes or source URLs have been supplied yet.** Implement the entire component and data structure, but do not invent praise, authors, handles, avatars, or company endorsements. `content/testimonials.json` starts empty. For development/review only, show neutral cards labeled "Testimonial placeholder" with non-personal placeholder fields, enabled through an explicit preview-only flag. Default public behavior hides the section when no verified entries exist, including its navigation anchor. Never ship placeholders as real testimonials. Document exactly where Eda can add real post links and verified excerpts. Do not copy the example endorsements from the screenshot.

### Ways to work together

Heading: **A focused project. An ongoing partnership.**

Two concise descriptions:
- For a specific launch, content series, or onboarding review.
- For consistent support across content, DevRel, and growth.

No pricing, turnaround guarantees, or subscription terms have been agreed. Do not invent them.

### About

Small label: **About the studio**

Heading: **Founded by Eda Akturk.**

Copy:

Ship & Tell is led by Eda, a developer turned marketer with experience across technical sales, developer relations, and product launches. She brings a technical background to the work of explaining products and building developer communities.

Use the real `public/images/eda-cryptist.webp` portrait, modestly sized, only in this section. Do not recreate her face with AI or crop it from the generated mockup.

Under the explicit label **Founder's experience**, display Hyperlane, BuidlGuidl, World Bank Group, and Cisco as restrained text wordmarks. These are prior professional relationships, not clients of the new studio. New studio clients can be added later through a separate data list.

Keep the structure suitable for collaborators later. Do not add a fake team page or claim an existing partner network.

### Contact and footer

Heading: **Tell us what you're building.**

Support: **Let's find the right way to bring it to market.**

Button: **Start a conversation**

Use the verified current contact email, `edakturk19@gmail.com`, through a working mailto link. Keep the address configurable and provide a copy-email option with a visible success message. Do not invent a company-domain email or booking URL. If a real booking URL is added later, support it through configuration.

Footer: Ship & Tell Studio; Brooklyn, New York.

## Motion and scrolling

Inspect the live Skroll reference and capture its understated feel. Build real animation, not just a static imitation:
- Smooth anchor navigation using native scrolling; do not hijack wheel/touch scrolling.
- Small scroll-triggered reveals: opacity plus 12–20px vertical movement, roughly 400–650ms, with short 50–90ms child staggers.
- Gentle button/link transitions and subtle work-image hover zoom, at most about 1.02x.
- A quiet sticky-header transition as the page scrolls.
- Work and testimonial motion as specified above.

Text must be visible without JavaScript. Reduced-motion mode removes nonessential movement and starts carousels paused. Do not make content depend on long intro animations, custom cursors, scroll locks, or elaborate loading screens. The suggested timings are implementation targets, not measurements of Skroll's source code.

## Implementation and easy editing

Use current stable compatible Next.js App Router, TypeScript, and Tailwind CSS. Verify current official documentation at implementation time and commit a lockfile. Keep the site simple: no login, database, CMS, payment flow, or unnecessary backend.

Keep the working name, full brand name, location, contact email, optional booking URL, canonical URL, social links, and feature flags in one clearly named configuration file. Keep services, projects, and testimonials as editable structured data. Seed from `content/site-config.json` and `content/projects.json`; refactor into typed modules if useful. Derive page titles, metadata, wordmark text, and footer branding from configuration so renaming the company is straightforward.

Use original bundled assets for the finished site. See `docs/ASSET_SOURCES.md`. Optimize images without excessive upscaling, preserve aspect ratios, use meaningful alt text, and load below-fold media lazily.

Add useful title/description metadata, favicon, and a simple typographic social-sharing image based on the brand. Do not invent a canonical domain; keep it unset until a real deployment URL is known. Client testimonials and founder experience must stay distinct in data and presentation.

## Delivery and acceptance checks

1. Build and type checks pass; no broken assets, hydration errors, or browser console errors.
2. Inspect at 375px, 768px, and 1440px widths. No horizontal page overflow; the carousel is the only intentionally horizontal content.
3. Confirm the real Inter font loads and the dark layout retains the reference's restrained proportions.
4. Verify every anchor, project link, contact action, mobile menu, and email-copy action.
5. Exercise work autoplay, hover/focus pause, manual Pause/Play, swipe, keyboard navigation, and detail reveal. Test transitions between pause reasons.
6. Exercise testimonial motion with explicitly labeled preview data, and verify the default empty-data state hides the public section and its nav link.
7. Check reduced motion, keyboard focus visibility, accessible names, offscreen pausing, and behavior when the tab becomes hidden.
8. Take desktop and mobile screenshots, plus a short recording of the carousels and scroll animation.
9. Update README with setup, local run/build commands, editing content, adding verified X testimonials, changing the brand name, and deployment instructions.
10. Open a pull request with the implementation, checks, screenshots, and any remaining content gaps. If an existing authorized preview deployment is available, include its URL; otherwise provide local preview instructions. Do not change edatweets.com, attach a custom domain, or merge without the owner's direction.

Make routine implementation decisions independently. Only stop for a genuine missing credential or a decision that materially changes the brief. Complete a reviewable implementation rather than returning only a plan.

