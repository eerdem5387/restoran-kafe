import Link from "next/link";

type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeClass: Record<LogoSize, string> = {
  sm: "gap-0 [&_.logo-name]:text-[1.35rem] [&_.logo-tag]:text-[0.55rem]",
  md: "gap-0.5 [&_.logo-name]:text-[1.65rem] sm:[&_.logo-name]:text-[1.9rem] [&_.logo-tag]:text-[0.6rem] sm:[&_.logo-tag]:text-[0.65rem]",
  lg: "gap-0.5 [&_.logo-name]:text-[2.1rem] sm:[&_.logo-name]:text-[2.4rem] [&_.logo-tag]:text-[0.7rem] sm:[&_.logo-tag]:text-[0.75rem]",
  xl: "gap-1 [&_.logo-name]:text-[2.75rem] sm:[&_.logo-name]:text-[3.25rem] md:[&_.logo-name]:text-[3.75rem] [&_.logo-tag]:text-[0.8rem] sm:[&_.logo-tag]:text-[0.9rem]",
};

type LogoProps = {
  size?: LogoSize;
  href?: string | null;
  className?: string;
};

export function Logo({ size = "md", href = "/", className = "" }: LogoProps) {
  const mark = (
    <span className={`inline-flex flex-col items-start leading-none ${sizeClass[size]}`}>
      <span className="logo-name font-brand leading-none">Berray&apos;s</span>
      <span className="logo-tag font-brand-sub font-bold italic uppercase tracking-[0.18em]">
        Kitchen &amp; Cafe
      </span>
    </span>
  );

  if (href === null) {
    return <span className={className || undefined}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary-container/50 ${className || "text-primary"}`}
      aria-label="Berray's ana sayfa"
    >
      {mark}
    </Link>
  );
}
