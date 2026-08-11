"use client";

import { usePathname } from "next/navigation";

const INSTAGRAM_URL = "https://www.instagram.com/berrayscafe/";

export function InstagramFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Berray's Instagram"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-almond shadow-[0_8px_28px_rgba(51,33,13,0.28)] transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-5 sm:bottom-5 sm:h-14 sm:w-14"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/insta-logo.svg" alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}
