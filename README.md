# landing-page — 9st Whip

Marketing site for **9st Whip** by 9th Street Labs — live at [9thstreetlabs.com](https://9thstreetlabs.com).

Next.js 15 (App Router) + Tailwind. All copy, links, and metadata live in
`lib/site.ts`; sections are composed in `app/page.tsx` from
`components/sections/`.

> Part of the 9st Whip product (sibling repos: `backend`, `desktop-client`,
> `mobile-frontend`, `hardware`).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

## Editing copy

Everything user-visible is centralized in `lib/site.ts` — product name,
tagline, nav, download links (currently placeholders until public builds
ship), ticker stats, and section copy. SEO metadata (title/description/OG)
derives from the same object in `app/layout.tsx`; the social share image is
generated at build time by `app/opengraph-image.tsx`.
