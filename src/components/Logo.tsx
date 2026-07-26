import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/berrays-logo.png";
const LOGO_ALT = "Berrays";

type LogoSize = "sm" | "md" | "lg" | "xl";

/** Fixed height + max-width so the wide logo never blows the layout */
const sizeClass: Record<LogoSize, string> = {
  sm: "h-7 max-w-[120px] sm:h-8 sm:max-w-[140px]",
  md: "h-8 max-w-[150px] sm:h-10 sm:max-w-[180px]",
  lg: "h-10 max-w-[180px] sm:h-12 sm:max-w-[220px]",
  xl: "h-14 max-w-[240px] sm:h-16 sm:max-w-[280px]",
};

type LogoProps = {
  size?: LogoSize;
  href?: string | null;
  className?: string;
  priority?: boolean;
};

export function Logo({
  size = "md",
  href = "/",
  className = "",
  priority = false,
}: LogoProps) {
  const image = (
    <span className={`relative inline-block ${sizeClass[size]} ${className}`}>
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={800}
        height={150}
        priority={priority}
        className="h-full w-auto max-w-full object-contain object-left"
      />
    </span>
  );

  if (href === null) {
    return image;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-primary-container/50"
      aria-label="Berrays ana sayfa"
    >
      {image}
    </Link>
  );
}
