import type { IFuseOptions } from "fuse.js";

export type SearchDoc = {
  id: string;
  kind: "article" | "author" | "news" | "issue";
  title: string;
  href: string;
  subtitle: string;
  body: string;
  keywords: string[];
  date?: string;
};

export const fuseOptions: IFuseOptions<SearchDoc> = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "keywords", weight: 0.25 },
    { name: "subtitle", weight: 0.15 },
    { name: "body", weight: 0.1 },
  ],
};
