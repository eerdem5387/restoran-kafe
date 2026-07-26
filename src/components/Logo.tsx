import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/berrays.svg";
const LOGO_ALT = "Berrays";

type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeClass: Record<LogoSize, string> = {
  sm: "h-8 w-auto sm:h-9",
  md: "h-10 w-auto sm:h-12",
  lg: "h-14 w-auto sm:h-16 md:h-20",
  xl: "h-24 w-auto sm:h-28 md:h-36",
};

type LogoProps = {
  size?: LogoSize;
  href?: string | null;
  className?: string;
  priority?: boolean;
  /** Invert / brighten logo on dark backgrounds */
  onDark?: boolean;
};

export function Logo({
  size = "md",
  href = "/",
  className = "",
  priority = false,
  onDark = false,
}: LogoProps) {
  const image = (
    <Image
      src={LOGO_SRC}
      alt={LOGO_ALT}
      width={360}
      height={202}
      priority={priority}
      className={`${sizeClass[size]} object-contain object-left ${onDark ? "brightness-110" : ""} ${className}`}
    />
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
