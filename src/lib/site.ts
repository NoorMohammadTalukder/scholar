/** Sub-path the site is served from ("" or e.g. "/scholar"). next/link adds it automatically; raw <a> hrefs must use withBase(). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);

export const site = {
  name: "Scholar",
  fullName: "Scholar: Journal of Interdisciplinary Research",
  tagline: "Ideas that cross boundaries.",
  description:
    "Scholar is a peer-reviewed, open-access journal publishing rigorous research across the sciences, humanities, and engineering.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scholar-journal.example.com",
  publisher: "Scholar Press",
  issn: { print: "2999-1234", online: "2999-1242" },
  founded: 2024,
  email: "editor@scholar-journal.example.com",
  address: "600 W College Ave, Tallahassee, FL 32306, USA",
  twitter: "@scholarjournal",
  license: {
    name: "CC BY 4.0",
    url: "https://creativecommons.org/licenses/by/4.0/",
  },
} as const;

export const nav = [
  { href: "/issues", label: "Issues" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/for-authors", label: "For Authors" },
  { href: "/news", label: "News" },
] as const;

export const footerNav = {
  Journal: [
    { href: "/issues", label: "All issues" },
    { href: "/articles", label: "All articles" },
    { href: "/authors", label: "Authors" },
    { href: "/news", label: "News & calls" },
    { href: "/search", label: "Search" },
  ],
  About: [
    { href: "/about", label: "Aims & scope" },
    { href: "/about#editorial-board", label: "Editorial board" },
    { href: "/about#policies", label: "Policies" },
    { href: "/contact", label: "Contact" },
  ],
  Authors: [
    { href: "/for-authors", label: "Submission guidelines" },
    { href: "/for-authors#process", label: "Review process" },
    { href: "/for-authors#faq", label: "FAQ" },
    { href: "/feed.xml", label: "RSS feed" },
  ],
} as const;

export const editorialBoard = [
  { name: "Prof. Amara Okafor", role: "Editor-in-Chief", affiliation: "Florida State University" },
  { name: "Dr. Henrik Lindqvist", role: "Deputy Editor", affiliation: "KTH Royal Institute of Technology" },
  { name: "Dr. Priya Raghunathan", role: "Associate Editor, Computing", affiliation: "IIT Madras" },
  { name: "Dr. Mateo Álvarez", role: "Associate Editor, Life Sciences", affiliation: "Universidad de Chile" },
  { name: "Prof. Yuki Tanaka", role: "Associate Editor, Humanities", affiliation: "University of Tokyo" },
  { name: "Dr. Leila Haddad", role: "Associate Editor, Engineering", affiliation: "American University of Beirut" },
  { name: "Dr. Samuel Mensah", role: "Managing Editor", affiliation: "Scholar Press" },
  { name: "Dr. Ingrid Bauer", role: "Statistics Editor", affiliation: "ETH Zürich" },
];

export const indexingPartners = [
  "Google Scholar",
  "Crossref",
  "DOAJ",
  "Scopus",
  "Web of Science",
  "OpenAlex",
  "Semantic Scholar",
  "CORE",
  "BASE",
  "Dimensions",
];
