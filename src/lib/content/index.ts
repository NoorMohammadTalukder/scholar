import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import type { z } from "zod";
import {
  articleSchema,
  authorSchema,
  issueSchema,
  newsSchema,
  pageSchema,
  type ArticleFrontmatter,
  type AuthorFrontmatter,
  type IssueFrontmatter,
  type NewsFrontmatter,
  type PageFrontmatter,
} from "./schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Author = AuthorFrontmatter & { slug: string; body: string };
export type Issue = IssueFrontmatter & { slug: string; body: string; label: string };
export type Article = ArticleFrontmatter & {
  slug: string;
  body: string;
  authorDetails: Author[];
  issueDetails: Issue | undefined;
};
export type NewsPost = NewsFrontmatter & { slug: string; body: string };
export type Page = PageFrontmatter & { slug: string; body: string };

function readCollection<S extends z.ZodTypeAny>(
  dir: string,
  schema: S,
): Array<z.infer<S> & { slug: string; body: string }> {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        throw new Error(
          `Invalid frontmatter in content/${dir}/${file}:\n${parsed.error.issues
            .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
            .join("\n")}`,
        );
      }
      return { ...(parsed.data as object), slug: file.replace(/\.mdx?$/, ""), body: content } as z.infer<S> & {
        slug: string;
        body: string;
      };
    });
}

export const getAuthors = cache((): Author[] =>
  readCollection("authors", authorSchema).sort((a, b) => a.name.localeCompare(b.name)),
);

export const getAuthor = cache((slug: string) => getAuthors().find((a) => a.slug === slug));

export const getIssues = cache((): Issue[] =>
  readCollection("issues", issueSchema)
    .map((i) => ({ ...i, label: `Vol. ${i.volume}, No. ${i.number}` }))
    .sort((a, b) => b.volume - a.volume || b.number - a.number),
);

export const getIssue = cache((slug: string) => getIssues().find((i) => i.slug === slug));

export const getCurrentIssue = cache(() => getIssues().find((i) => i.current) ?? getIssues()[0]);

export const getAllArticles = cache((): Article[] => {
  const authors = getAuthors();
  const issues = getIssues();
  return readCollection("articles", articleSchema)
    .map((a) => ({
      ...a,
      authorDetails: a.authors.map((slug) => {
        const found = authors.find((x) => x.slug === slug);
        if (!found) throw new Error(`Article "${a.slug}" references unknown author "${slug}"`);
        return found;
      }),
      issueDetails: issues.find((i) => i.slug === a.issue),
    }))
    .sort((a, b) => b.published.localeCompare(a.published));
});

export const getArticle = cache((slug: string) => getAllArticles().find((a) => a.slug === slug));

export const getArticlesForIssue = cache((issue: Issue): Article[] => {
  const all = getAllArticles().filter((a) => a.issue === issue.slug);
  const order = new Map(issue.articles.map((s, i) => [s, i]));
  return all.sort(
    (a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999) || a.pages.localeCompare(b.pages),
  );
});

export const getArticlesByAuthor = cache((slug: string) =>
  getAllArticles().filter((a) => a.authors.includes(slug)),
);

export const getFeaturedArticles = cache((limit = 3) => {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return [...featured, ...all.filter((a) => !a.featured)].slice(0, limit);
});

export const getRelatedArticles = cache((article: Article, limit = 3) => {
  const others = getAllArticles().filter((a) => a.slug !== article.slug);
  const score = (a: Article) =>
    a.keywords.filter((k) => article.keywords.includes(k)).length * 3 +
    a.authors.filter((k) => article.authors.includes(k)).length * 2 +
    (a.issue === article.issue ? 1 : 0);
  return others
    .map((a) => ({ a, s: score(a) }))
    .sort((x, y) => y.s - x.s || y.a.published.localeCompare(x.a.published))
    .slice(0, limit)
    .map((x) => x.a);
});

export const getAllKeywords = cache(() => {
  const counts = new Map<string, number>();
  for (const a of getAllArticles()) for (const k of a.keywords) counts.set(k, (counts.get(k) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
});

export const getNews = cache((): NewsPost[] =>
  readCollection("news", newsSchema).sort((a, b) => b.date.localeCompare(a.date)),
);

export const getNewsPost = cache((slug: string) => getNews().find((n) => n.slug === slug));

export const getPage = cache((slug: string): Page | undefined =>
  readCollection("pages", pageSchema).find((p) => p.slug === slug),
);

export const getStats = cache(() => {
  const articles = getAllArticles();
  const authors = getAuthors();
  const countries = new Set(authors.map((a) => a.country).filter(Boolean));
  return {
    articles: articles.length,
    authors: authors.length,
    issues: getIssues().length,
    countries: countries.size,
  };
});

/** Strip frontmatter-free MDX to plain text for search / reading time. */
export function plainText(mdx: string) {
  return mdx
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~[\]()|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
