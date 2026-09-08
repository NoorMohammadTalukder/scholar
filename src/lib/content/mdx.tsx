import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/site";

function Figure({
  caption,
  children,
  className,
}: {
  caption?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="rounded-2xl border border-line bg-elevated p-6">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function Callout({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-2xl border border-accent/30 bg-accent-soft p-6">
      {title && <p className="eyebrow mb-2 !text-accent">{title}</p>}
      <div className="text-[0.97rem] leading-relaxed">{children}</div>
    </aside>
  );
}

function Equation({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl bg-elevated px-6 py-4 text-center font-mono text-[0.95rem]">
      {children}
    </div>
  );
}

const components = {
  Figure,
  Callout,
  Equation,
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a {...props} href={props.href ? withBase(props.href) : undefined} target={props.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" />
  ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
      }}
    />
  );
}

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Extract h2/h3 headings from raw MDX for the table of contents (ids match rehype-slug). */
export function extractToc(mdx: string): TocItem[] {
  const items: TocItem[] = [];
  const body = mdx.replace(/```[\s\S]*?```/g, "");
  for (const m of body.matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm)) {
    const text = m[2].replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .trim()
      .replace(/\s+/g, "-");
    items.push({ id, text, level: m[1].length as 2 | 3 });
  }
  return items;
}
