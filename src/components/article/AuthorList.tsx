import Link from "next/link";
import type { Author } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";

export function AuthorList({ authors, size = "md" }: { authors: Author[]; size?: "sm" | "md" }) {
  return (
    <ul className={size === "md" ? "flex flex-wrap gap-x-8 gap-y-4" : "flex flex-wrap gap-x-5 gap-y-2"}>
      {authors.map((a) => (
        <li key={a.slug}>
          <Link href={`/authors/${a.slug}`} className="group flex items-center gap-3">
            <Avatar name={a.name} size={size === "md" ? 44 : 30} />
            <span>
              <span className="block font-medium leading-tight transition-colors group-hover:text-accent">{a.name}</span>
              {size === "md" && <span className="block text-[0.85rem] text-muted">{a.affiliation}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
