"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { duration, easeEditorial, easeInOutCubic } from "@/lib/motion";

/**
 * Page wipe managed outside the keyed content tree so a stuck exit
 * transform cannot leave a permanent brown overlay (common on iOS).
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const childrenRef = useRef(children);
  childrenRef.current = children;

  const [displayChildren, setDisplayChildren] = useState(children);
  const [displayPath, setDisplayPath] = useState(pathname);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");

  // Keep content fresh while staying on the same route
  useEffect(() => {
    if (pathname === displayPath) {
      setDisplayChildren(children);
    }
  }, [children, pathname, displayPath]);

  // Run wipe only when the path actually changes
  useEffect(() => {
    if (pathname === displayPath) return;

    if (reduce) {
      setDisplayPath(pathname);
      setDisplayChildren(childrenRef.current);
      setPhase("idle");
      return;
    }

    let cancelled = false;
    const coverMs = Math.round(duration.page * 0.5 * 1000);
    const revealMs = Math.round(duration.page * 0.55 * 1000);

    setPhase("cover");

    const swapTimer = window.setTimeout(() => {
      if (cancelled) return;
      setDisplayPath(pathname);
      setDisplayChildren(childrenRef.current);
      setPhase("reveal");
    }, coverMs);

    const idleTimer = window.setTimeout(() => {
      if (cancelled) return;
      setPhase("idle");
    }, coverMs + revealMs);

    const failsafe = window.setTimeout(() => {
      if (cancelled) return;
      setDisplayPath(pathname);
      setDisplayChildren(childrenRef.current);
      setPhase("idle");
    }, coverMs + revealMs + 400);

    return () => {
      cancelled = true;
      window.clearTimeout(swapTimer);
      window.clearTimeout(idleTimer);
      window.clearTimeout(failsafe);
    };
  }, [pathname, displayPath, reduce]);

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {(phase === "cover" || phase === "reveal") && (
          <motion.div
            key="page-wipe"
            className="pointer-events-none fixed inset-0 z-[90] bg-primary-container"
            initial={{ y: "-100%" }}
            animate={{ y: phase === "cover" ? "0%" : "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: duration.page * 0.5, ease: easeInOutCubic }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={displayPath}
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: duration.base, ease: easeEditorial, delay: 0.05 },
        }}
      >
        {displayChildren}
      </motion.div>
    </>
  );
}
