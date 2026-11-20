# Eda Studio — comparison concept 5

A standalone studio website built with Next.js App Router, TypeScript, and Tailwind CSS, using the original handoff assets. This does not change edatweets.com.

This independent option starts from PR #1 without changing its branch. Eda Studio uses a personal-name identity, warm sand on charcoal, an editorial split hero with a three-discipline diagram, and a work → services → founder sequence. It is a local comparison concept, not a production launch or a cleared business name.

UI polish follows [Jakub Krehel’s Better UI](https://github.com/jakubkrehel/skills/tree/main/skills/better-ui): inset white image outlines, concentric header/button radii, optical icon padding, and pointer-gated hover. Motion follows [Emil Kowalski’s design-engineering guidance](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng): brief press feedback, interruptible transitions, a grouped hero entrance, and instant keyboard carousel navigation. Reduced-motion, pause controls, and no-JavaScript readability remain in place.

## Install and develop

Use Node.js 24 LTS (`nvm use` if using nvm).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No credentials, database, or external service is required. No pre-commit hooks are configured in this repository.

## Checks, preview, and deployment

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build on port 3000. Use `npm start -- --port 3001` for another port. Both servers bind to all interfaces for hosted previews. Type checking first generates Next.js route types. The lockfile pins dependencies. Inter is self-hosted through `next/font/local` from the official Google Fonts distribution, with its license in `app/fonts/OFL.txt`; no external font requests are needed, even at build time.

Deploy as a standard Next.js app to a compatible Node host or import the repo into Vercel. Build using `npm ci && npm run build`, then serve with `npm start`. A Devin browser preview is session-authorized, not a public production deployment. No domain is configured; only set `canonicalUrl` after confirming a real deployment URL.

## Content and branding

The studio’s positioning is “A growth studio for startups,” with community, content, and strategy as equal service pillars. Past-work descriptions retain their original technical context.

| File                        | What to edit                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `content/site-config.json`  | Brand, suffix, full name, location, email, optional booking/canonical URLs, social links, founder information, and feature flag. |
| `content/services.json`     | Service headings and descriptions.                                                                                               |
| `content/projects.json`     | Original images, roles, descriptions, categories, and destination links.                                                         |
| `content/experience.json`   | Experience names and bundled logo dimensions; separate from clients and endorsements.                                           |
| `content/faq.json`          | Collaboration FAQ: kickoff, one-off projects, ongoing support, and working directly with Eda.                                    |
| `content/testimonials.json` | Verified testimonials only; initially empty.                                                                                     |
| `public/images/`            | Original founder and project images.                                                                                             |
| `app/globals.css`           | Palette tokens, typography, responsive layout, and motion.                                                                       |

To rename the business, change `brandName`, `brandSuffix`, and `fullBrandName` together in the single configuration file. Wordmarks, metadata, favicon initials, sharing image, About introduction, and footer read that file. `socialLinks` accepts label-to-URL pairs. Keep optional URLs null rather than inventing them. Contact uses mailto and a copy-email action; a configured booking URL can replace the primary contact destination.

Projects are **previous founder work**, not studio clients. Preserve role attribution, especially the community-built Hyperlane MCP distinction. Founder experience is separate from studio clients and testimonials. See `docs/ASSET_SOURCES.md` for provenance and `docs/DEVIN_PROMPT.md` for the original brief.

## Add verified X testimonials

Keep the JSON array empty until original posts and excerpts have been verified. Each record follows this type (these comments are field instructions, not publishable sample endorsements):

```ts
type Testimonial = {
  id: string;
  quote: string; // Verified excerpt
  author: string;
  handle: string;
  avatar: string; // Prefer a local /images/... file with permission to use
  role?: string;
  company?: string;
  postUrl: string; // Original https://x.com/.../status/... or twitter.com equivalent
  date?: string; // ISO date, YYYY-MM-DD
  context: "founder-work" | "studio-work";
  verified: boolean; // True only after editorial verification
};
```

Only complete, verified entries are rendered. The public section and navigation item stay hidden when no entries exist. Cards link to original posts without X embeds, login, or API requests. Prefer bundled local avatars; remote avatar URLs use ordinary image delivery. Never copy people or quotes from the reference screenshot.

### Development-only testimonial preview

```sh
TESTIMONIAL_PREVIEW=1 npm run dev
```

Alternatively, enable `showTestimonialPlaceholders` in the config during development. Both switches are ignored in production. Cards explicitly say “Testimonial placeholder” and “Not an endorsement,” with no invented identities, handles, or source URLs. Desktop uses staggered vertical columns; mobile uses a horizontal swipeable list.

## Motion and accessibility

- Work glides at 25px/second while onscreen in a visible tab. Hover/focus reveals roles, descriptions, and links while keeping the original image visible. Pause is persistent until Play; Previous/Next, arrow keys, mouse drag, native swipe, and tap selection are supported.
- Reduced motion starts paused. Playback can be explicitly enabled. Embla loops by repositioning original interactive cards, without loop clones. Without JavaScript, original project details and links remain readable with native horizontal browsing.
- Testimonials pause on hover/focus, manual Pause, offscreen, and hidden tabs. Reduced motion removes testimonial animation. Mobile uses native swipe instead of autoplay.
- The mobile menu closes with Escape, outside click, navigation, focus exit, and desktop resize. Native smooth anchors account for the sticky header. Visible focus rings and a skip link support keyboard users.
- The collaboration FAQ uses native details/summary controls, including keyboard and no-JavaScript support; no invented prices or subscription terms.
- Services use a sticky desktop heading and native-scroll-driven focus between three readable rows. There is no scroll lock or wheel interception; reduced motion and no-JavaScript rendering keep the full static content.
- The hero enters in a slower 950ms stagger; scroll reveals use 18px movement and 850ms easing. Service, image, and button hover effects stay subtle, with image zoom limited to 1.02x. Reduced motion removes entrances and transitions. Server-rendered content remains readable without JavaScript.

The approved mockup supplies layout direction, not production text or photographs. Original work images use `next/image`, preserve aspect ratios, and load lazily below the fold. Eda’s original portrait appears only in About. No invented client marks, pricing, team, quotes, or domain are included.

The chosen palette is dark (`#101110`) with warm-sand accents (`#E8D5B0`), including the favicon and sharing image. The compact, centered floating header follows Eda’s Skroll reference, adapted to the dark theme with a sand contact button.
