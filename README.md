# Scholar — academic journal website

A static-first, animation-rich journal site built with Next.js (App Router), Tailwind CSS v4, Motion, and Lenis. Content lives in the repo as MDX; there is no database or CMS.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static production build
npm run lint
```

## Where things live

| Path | What |
|---|---|
| `content/articles/*.mdx` | One file per article (frontmatter + full text) |
| `content/issues/*.mdx` | One file per issue (frontmatter + editorial note) |
| `content/authors/*.mdx` | One file per author (frontmatter + short bio) |
| `content/news/*.mdx` | Announcements, calls for papers, events |
| `content/pages/*.mdx` | Aims & scope, policies, submission guidelines |
| `public/pdfs/` | Article PDFs and the manuscript template |
| `src/lib/site.ts` | Journal name, ISSN, publisher, nav, editorial board, indexing partners |
| `src/lib/content/schema.ts` | Zod schemas that validate every frontmatter field at build time |
| `src/lib/content/index.ts` | Loaders: `getAllArticles`, `getIssues`, `getAuthor`, `getRelatedArticles`, … |
| `src/components/motion/` | Reusable animation primitives (Reveal, TextReveal, TiltCard, Magnetic, Marquee, Counter, Parallax, ProgressBar, Cursor, PageTransition) |

## Add an article

1. Add the author(s) to `content/authors/<slug>.mdx` if they are new.
2. Put the PDF in `public/pdfs/`.
3. Create `content/articles/<slug>.mdx`:

```mdx
---
title: Your title
subtitle: Optional subtitle
authors: [author-slug, another-author-slug]
issue: vol-02-issue-01
abstract: One paragraph.
keywords: [keyword one, keyword two]
doi: 10.99999/scholar.2026.1.4
pdf: /pdfs/your-file.pdf
received: 2026-01-10
accepted: 2026-03-01
published: 2026-04-10
pages: 57-80
type: research        # research | review | editorial | short-communication | perspective
featured: false
---
## Introduction
Body text in Markdown. You can use <Figure caption="…">, <Callout title="…"> and <Equation>.
```

4. Add the slug to the `articles:` list of the issue file to control its order in the issue.
5. Run `npm run build`. Invalid or missing fields fail the build with a clear message.

The article automatically appears in the archive, its issue, each author's page, related-article lists, search, the RSS feed, and the sitemap. It also gets an Open Graph image, Google Scholar `citation_*` meta tags, and `ScholarlyArticle` JSON-LD.

## Add an issue

Create `content/issues/vol-0X-issue-0Y.mdx` with `volume`, `number`, `year`, `season`, `published`, `summary`, and `articles: [...]`. Set `current: true` on the newest issue (and remove it from the previous one). The cover is generated typographically, so no image is needed.

## Configure

- Set `NEXT_PUBLIC_SITE_URL` to the production URL before building so canonical links, the feed, the sitemap, and OG images use the right domain.
- Edit `src/lib/site.ts` for the journal name, ISSN, publisher, contact email, nav, editorial board, and indexing partners.
- Design tokens (colours, fonts, radii) are CSS variables at the top of `src/app/globals.css`.

## Deploy

The site is fully static. Deploy to Vercel with zero configuration, or set `output: "export"` in `next.config.ts` and upload the `out/` folder to any static host (Netlify, Cloudflare Pages, GitHub Pages).

## Placeholder PDFs

`scripts/make-placeholder-pdfs.mjs` generates one-page placeholder PDFs for every article that declares a `pdf` path. Replace them with the real typeset files.
