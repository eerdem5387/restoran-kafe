"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { duration, easeEditorial, easeInOutCubic } from "@/lib/motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        <motion.div
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-primary-container"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: duration.page * 0.55, ease: easeInOutCubic }}
        />
        <motion.div
          className="pointer-events-none fixed inset-0 z-[89] origin-bottom bg-secondary"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: duration.page * 0.55, ease: easeInOutCubic, delay: 0.05 }}
        />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: duration.base, ease: easeEditorial, delay: 0.15 },
          }}
          exit={{
            opacity: 0,
            y: -12,
            transition: { duration: 0.25, ease: easeInOutCubic },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
