"use client";

import { KeyboardEvent, useState } from "react";

type TagInputProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
};

export function TagInput({ tags, onChange }: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag(raw: string) {
    const next = raw
      .split(/[,;]+/)
      .map((t) => t.trim())
      .filter(Boolean);
    if (!next.length) return;

    const merged = [...tags];
    for (const tag of next) {
      const exists = merged.some((t) => t.toLocaleLowerCase("tr") === tag.toLocaleLowerCase("tr"));
      if (!exists) merged.push(tag);
    }
    onChange(merged);
    setDraft("");
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div>
      <div className="form-input-ledger flex min-h-11 flex-wrap items-center gap-2 py-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 border border-primary/15 bg-secondary-container/40 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {tag}
            <button
              type="button"
              aria-label={`${tag} etiketini kaldır`}
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="text-on-surface-variant transition-colors hover:text-red-700"
            >
              <span className="material-symbols-outlined text-sm leading-none">close</span>
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            if (draft.trim()) addTag(draft);
          }}
          placeholder={tags.length ? "Yeni etiket…" : "Örn. Glutensiz, ve Enter"}
          className="min-w-[8rem] flex-1 border-0 bg-transparent p-0 text-base outline-none placeholder:text-on-surface-variant/60"
        />
      </div>
      <p className="mt-1.5 text-[11px] text-on-surface-variant">
        Enter veya virgül ile ekleyin. Bu etiketler menüde ürün açıklamasının yerini alır.
      </p>
    </div>
  );
}
