"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { easeEditorial } from "@/lib/motion";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/reservations", label: "Rezervasyon" },
  { href: "/story", label: "Hikâyemiz" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    if (latest > lastY.current && latest > 120) {
      setHidden(true);
      setOpen(false);
    } else {
      setHidden(false);
    }
    lastY.current = latest;
  });

  return (
    <motion.header
      className={`fixed top-0 z-50 w-full border-b backdrop-blur-md transition-[background,box-shadow] duration-500 ${
        scrolled
          ? "border-outline-variant/40 bg-surface/95 shadow-[0_8px_30px_rgba(75,54,33,0.08)]"
          : "border-outline-variant/20 bg-surface/80 shadow-none"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      initial={{ y: -100 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: easeEditorial }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-margin-mobile sm:h-20 md:px-margin-desktop">
        <Logo size="md" />

        <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-1 py-2 text-sm transition-colors ${
                  active ? "font-bold text-primary" : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <MagneticButton
            href="/reservations"
            className="min-h-11 rounded bg-primary-container px-6 py-3 font-body text-xs font-semibold uppercase tracking-wider text-on-primary"
          >
            Masa Ayırt
          </MagneticButton>
        </div>

        <button
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center p-2 text-primary lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            key={open ? "close" : "menu"}
            className="material-symbols-outlined inline-block text-[28px]"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {open ? "close" : "menu"}
          </motion.span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-outline-variant/30 bg-surface lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
          >
            <nav className="flex flex-col gap-1 px-margin-mobile py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease: easeEditorial }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block min-h-12 py-3 text-base text-on-surface-variant hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/reservations"
                onClick={() => setOpen(false)}
                className="mt-2 flex min-h-12 items-center justify-center rounded bg-primary-container px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-on-primary"
              >
                Masa Ayırt
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
