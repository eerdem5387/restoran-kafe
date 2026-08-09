"use client";

type MenuTagsProps = {
  tags: string[];
  /** Dark menu surfaces use the light variant */
  light?: boolean;
  className?: string;
};

export function MenuTags({ tags, light = false, className = "" }: MenuTagsProps) {
  if (!tags.length) return null;

  return (
    <ul className={`mt-3 flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className={
              light
                ? "inline-flex items-center border border-on-primary-container/35 bg-on-primary-container/10 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-on-primary-container"
                : "inline-flex items-center border border-primary/15 bg-secondary-container/35 px-2.5 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-primary"
            }
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}
