import { z } from "zod";

// YAML parses bare dates as Date objects; normalise to "YYYY-MM-DD" strings.
const isoDate = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO date like 2026-03-14"),
);

export const authorSchema = z.object({
  name: z.string(),
  affiliation: z.string(),
  department: z.string().optional(),
  country: z.string().optional(),
  orcid: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  role: z.string().optional(),
});

export const issueSchema = z.object({
  title: z.string(),
  volume: z.number().int().positive(),
  number: z.number().int().positive(),
  year: z.number().int(),
  season: z.string(),
  published: isoDate,
  summary: z.string(),
  articles: z.array(z.string()).default([]),
  current: z.boolean().default(false),
});

export const articleTypes = [
  "research",
  "review",
  "editorial",
  "short-communication",
  "perspective",
] as const;

export const articleSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).min(1),
  issue: z.string(),
  abstract: z.string(),
  keywords: z.array(z.string()).default([]),
  doi: z.string().optional(),
  pdf: z.string().optional(),
  received: isoDate,
  accepted: isoDate,
  published: isoDate,
  pages: z.string(),
  type: z.enum(articleTypes).default("research"),
  featured: z.boolean().default(false),
  license: z.string().default("CC BY 4.0"),
  funding: z.string().optional(),
});

export const newsSchema = z.object({
  title: z.string(),
  date: isoDate,
  summary: z.string(),
  tag: z.enum(["announcement", "call-for-papers", "event"]).default("announcement"),
  deadline: isoDate.optional(),
});

export const pageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export type AuthorFrontmatter = z.infer<typeof authorSchema>;
export type IssueFrontmatter = z.infer<typeof issueSchema>;
export type ArticleFrontmatter = z.infer<typeof articleSchema>;
export type NewsFrontmatter = z.infer<typeof newsSchema>;
export type PageFrontmatter = z.infer<typeof pageSchema>;
export type ArticleType = (typeof articleTypes)[number];
