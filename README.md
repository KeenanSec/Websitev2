# KEENANSEC

Static Astro + TypeScript cybersecurity journal. Plain CSS, one validated Markdown collection, no backend or database. Source design: https://www.figma.com/design/HgdSz8zJ4a586b08BDNmGw/The-Other-Face-%E2%80%94-Cinematic-Blog?node-id=3-2 (frame 5:2 on page 3:2).

## Install and develop

Requires Node.js 22 and npm.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Commit the generated package-lock.json after the first installation, then use `npm ci` locally and in the workflow for reproducible installs. The initial environment had no Node or npm, so no lockfile could be generated here.

## Assets and design status

The Figma MCP was inspected before implementation. Reference: 1672 × 941, background #111, text #eee, supporting text #bfbfbf, borders rgba(158,158,158,.25). Inter 13px navigation/body, Cormorant Garamond 29px card titles, Bungee Outline 53px identity. Main content starts at x153; cards are 438 × 358 with 147px image regions and 18–19px gaps. Responsive CSS adapts these dimensions without fixed positioning.

**The original landscape and third-card image could not be downloaded because this environment cannot resolve the Figma asset host.** The first two card image regions are intentionally #333, exactly as supplied by the reference. The site conditionally displays available images and uses a dark background until assets are installed; it does not substitute a screenshot or invented imagery. The source project is therefore not yet a visually complete reproduction.

Obtain fresh asset URLs with Figma MCP `get_design_context`, file `HgdSz8zJ4a586b08BDNmGw`, node `5:2`: background `39027.png` and third card `a8f3e.png`. Download locally:

```sh
bash scripts/download-assets.sh 'LANDSCAPE_SOURCE_URL' 'IDENTITY_SOURCE_URL'
```

Commit `public/assets/landscape.png` and `public/assets/identity.png`, then rebuild. URLs from Figma are temporary; never use them as runtime URLs. Fonts are bundled locally by Fontsource. Consider lossless image compression before publication. A local SVG favicon and default social preview are included; for the broadest social crawler support, export the social preview to PNG and update Layout's default `image` property.

## Add an article

Create `src/content/articles/my-title.md`:

```yaml
---
title: My title
summary: A concise description.
date: 2026-10-20
category: Cybersecurity
tags: [detection, homelab]
demo: false
# Optional paths are relative to public/:
# cover: assets/my-cover.webp
# coverAlt: A meaningful description.
---
```

Write Markdown below the frontmatter. Filenames become stable `/articles/my-title/` routes; keep filenames flat. Valid categories: Cybersecurity, Reverse Engineering, Projects, Personal. The collection feeds home, archive, category pages, search, related articles, and generated reading pages. Reading time is calculated from content. Code fences use Shiki highlighting and clipboard controls. No MDX is needed. Four clearly labeled demonstration posts are included so progressive loading is observable; none claims completed work.

Change biography and social links in `src/pages/about.astro` and `src/lib/site.ts`. Social destinations default to an empty array rather than invented accounts. Enter `{label:'GitHub',url:'https://github.com/YOUR_ACCOUNT'}` when appropriate.

## GitHub Pages

Push this project as the repository root, with default branch `main`. In Settings → Pages select **GitHub Actions**. The included workflow installs dependencies, checks TypeScript/Astro, builds, uploads `dist`, and deploys through GitHub Pages. A successful workflow deployment is required before treating the site as published.

`actions/configure-pages` supplies the origin and repository base path automatically. Optional repository Actions variables:

- `SITE_URL`: origin, e.g. `https://username.github.io` or `https://example.com`.
- `BASE_PATH`: `/repository-name/` for a project site; `/` for a root site or custom domain.
- `CUSTOM_DOMAIN`: host only, e.g. `example.com`; writes `dist/CNAME`.

All internal URLs, assets, search results, and article links use the configured base. `SITE_URL` should be an origin, not a full repository URL. To test a project path locally:

```sh
SITE_URL=https://username.github.io BASE_PATH=/keenansec/ npm run build
BASE_PATH=/keenansec/ npm run preview
# Open http://localhost:4321/keenansec/
```

For a custom domain, configure the domain and DNS in GitHub Pages settings, set `SITE_URL=https://example.com`, `BASE_PATH=/`, and `CUSTOM_DOMAIN=example.com`. Wait for DNS verification and enable HTTPS. Do not commit temporary Figma URLs. Static directory routes allow article URLs to load directly and on refresh. GitHub serves the generated root `404.html` for missing URLs.

## Verification

```sh
npm run build
npx playwright install chromium
npm test
```

Tests cover direct article loading and refresh, card links, search results and empty states, dialog Escape/focus return, menus, categories, progressive loading, 404 navigation, and overflow at desktop/mobile sizes. Tests use a local dev server; production verification additionally requires `npm run preview` and checking the generated routes, including a repository base path. Native `<dialog>` handles focus containment and Escape; visible focus styles and reduced-motion handling are provided. Without JavaScript, archive entries remain available and navigation is accessible through the header on desktop and footer/about links; mobile navigation also has a no-script fallback.

**Verification limits in the delivery environment:** Node/npm and a browser automation runtime were unavailable. The production build and Playwright tests were authored but could not run. No rendered desktop/mobile comparison was possible. No GitHub deployment was attempted and this project is not claimed to be published. See `VERIFICATION.md` for the exact checks performed.
