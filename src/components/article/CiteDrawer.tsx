"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Format = "APA" | "BibTeX" | "RIS";

export function CiteDrawer({ citations, title }: { citations: Record<Format, string>; title: string }) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<Format>("APA");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(citations[format]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[0.95rem] font-medium transition-colors hover:bg-fg hover:text-bg"
      >
        <Quote size={16} /> Cite
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Close"
              className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Cite ${title}`}
              data-lenis-prevent
              className="fixed inset-x-0 bottom-0 z-[85] mx-auto max-w-3xl rounded-t-[1.75rem] border border-line bg-elevated p-6 shadow-card sm:p-8"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl">Cite this article</h2>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-5 flex gap-2">
                {(Object.keys(citations) as Format[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormat(f)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-[0.85rem] transition-colors",
                      format === f ? "text-white" : "text-muted hover:text-fg",
                    )}
                  >
                    {format === f && <motion.span layoutId="cite-tab" className="bg-gradient-accent absolute inset-0 rounded-full" />}
                    <span className="relative">{f}</span>
                  </button>
                ))}
              </div>
              <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-line bg-bg p-4 font-mono text-[0.82rem] leading-relaxed">
                {citations[format]}
              </pre>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-[0.95rem] font-medium text-bg transition-colors hover:bg-accent hover:text-white"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? "ok" : "copy"}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="grid place-items-center"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </motion.span>
                  </AnimatePresence>
                  {copied ? "Copied" : `Copy ${format}`}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
