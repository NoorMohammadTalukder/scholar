import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/site";

type Variant = "primary" | "outline" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-accent text-white shadow-[0_10px_30px_-10px_rgba(109,40,217,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(109,40,217,0.7)] hover:-translate-y-0.5",
  outline: "border border-line-strong bg-transparent text-fg hover:border-fg hover:bg-fg hover:text-bg",
  ghost: "bg-transparent text-fg hover:bg-accent-soft",
  inverse: "bg-fg text-bg hover:bg-accent hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.85rem]",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

type Common = { variant?: Variant; size?: Size; className?: string; arrow?: boolean; children: React.ReactNode };
type LinkProps = Common & { href: string; external?: boolean; download?: boolean };
type ButtonProps = Common & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, arrow, children } = props;
  const cls = cn(base, variants[variant], sizes[size], className);
  const arrowEl = arrow ? (
    <ArrowUpRight
      size={18}
      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
    />
  ) : null;

  if ("href" in props && props.href) {
    const { href, external, download } = props;
    if (external || download || href.startsWith("http") || href.endsWith(".pdf") || href.endsWith(".xml")) {
      return (
        <a href={withBase(href)} className={cls} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} download={download}>
          {children}
          {arrowEl}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
        {arrowEl}
      </Link>
    );
  }
  const rest: Partial<ButtonProps> = { ...(props as ButtonProps) };
  delete rest.variant;
  delete rest.size;
  delete rest.arrow;
  delete rest.className;
  delete rest.children;
  return (
    <button className={cls} {...rest}>
      {children}
      {arrowEl}
    </button>
  );
}
