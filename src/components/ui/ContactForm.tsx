"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("General enquiry");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = `${message}\n\n— ${name}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field = "w-full rounded-2xl border border-line bg-bg px-4 py-3 text-[0.95rem] outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[1.5rem] border border-line bg-elevated p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">Your name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">Topic</span>
          <select value={subject} onChange={(e) => setSubject(e.target.value)} className={field}>
            {["General enquiry", "Submission question", "Reviewer interest", "Press", "Indexing & archiving"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="eyebrow mb-2 block">Message</span>
        <textarea required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
      </label>
      <p className="text-[0.8rem] text-muted">This opens a draft in your email client addressed to the editorial office. Nothing is sent from this page.</p>
      <Button type="submit">
        <Send size={16} /> Compose email
      </Button>
    </form>
  );
}
