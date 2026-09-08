import type { Article } from "@/lib/content";
import { site } from "@/lib/site";

function surnameInitials(name: string) {
  const clean = name.replace(/^(Dr|Prof|Mr|Ms|Mrs)\.?\s+/i, "");
  const parts = clean.split(/\s+/);
  const surname = parts.pop() ?? "";
  const initials = parts.map((p) => `${p[0].toUpperCase()}.`).join(" ");
  return { surname, initials };
}

export function apa(article: Article) {
  const authors = article.authorDetails.map((a) => {
    const { surname, initials } = surnameInitials(a.name);
    return `${surname}, ${initials}`;
  });
  const authorStr =
    authors.length <= 1
      ? authors[0]
      : authors.length === 2
        ? authors.join(", & ")
        : `${authors.slice(0, -1).join(", ")}, & ${authors.at(-1)}`;
  const year = article.published.slice(0, 4);
  const issue = article.issueDetails;
  const vol = issue ? `${issue.volume}(${issue.number})` : "";
  const doi = article.doi ? ` https://doi.org/${article.doi}` : "";
  return `${authorStr} (${year}). ${article.title}. ${site.fullName}, ${vol}, ${article.pages}.${doi}`;
}

export function bibtex(article: Article) {
  const first = surnameInitials(article.authorDetails[0].name).surname.toLowerCase();
  const year = article.published.slice(0, 4);
  const key = `${first}${year}${article.slug.split("-")[0]}`;
  const authors = article.authorDetails.map((a) => a.name.replace(/^(Dr|Prof)\.?\s+/i, "")).join(" and ");
  const issue = article.issueDetails;
  const lines = [
    `@article{${key},`,
    `  title   = {${article.title}},`,
    `  author  = {${authors}},`,
    `  journal = {${site.fullName}},`,
    issue ? `  volume  = {${issue.volume}},` : null,
    issue ? `  number  = {${issue.number}},` : null,
    `  pages   = {${article.pages.replace("-", "--")}},`,
    `  year    = {${year}},`,
    `  issn    = {${site.issn.online}},`,
    article.doi ? `  doi     = {${article.doi}},` : null,
    `  url     = {${site.url}/articles/${article.slug}}`,
    `}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function ris(article: Article) {
  const issue = article.issueDetails;
  const lines = [
    "TY  - JOUR",
    `TI  - ${article.title}`,
    ...article.authorDetails.map((a) => `AU  - ${a.name.replace(/^(Dr|Prof)\.?\s+/i, "")}`),
    `JO  - ${site.fullName}`,
    `PY  - ${article.published.slice(0, 4)}`,
    issue ? `VL  - ${issue.volume}` : null,
    issue ? `IS  - ${issue.number}` : null,
    `SP  - ${article.pages.split("-")[0]}`,
    `EP  - ${article.pages.split("-")[1] ?? article.pages}`,
    article.doi ? `DO  - ${article.doi}` : null,
    `UR  - ${site.url}/articles/${article.slug}`,
    `AB  - ${article.abstract}`,
    ...article.keywords.map((k) => `KW  - ${k}`),
    "ER  - ",
  ].filter(Boolean);
  return lines.join("\n");
}
