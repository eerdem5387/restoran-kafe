"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { duration, easeEditorial, easeInOutCubic } from "@/lib/motion";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem("larome-preloader");
    if (seen || reduce) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("larome-preloader", "1");
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-container"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: duration.page, ease: easeInOutCubic } }}
        >
          <div className="relative flex flex-col items-center px-8">
            <motion.div
              className="absolute -top-16 left-1/2 h-20 w-px -translate-x-1/2 origin-bottom bg-gradient-to-t from-on-primary-container/60 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: [0, 1, 0.4] }}
              transition={{ duration: 1.4, ease: easeEditorial }}
            />
            <motion.div
              className="overflow-hidden text-on-primary"
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: easeEditorial }}
            >
              <Logo size="xl" href={null} />
            </motion.div>
            <motion.p
              className="mt-6 font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-on-primary-container"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ delay: 0.55, duration: 0.8, ease: easeEditorial }}
            >
              Sofistike Sıcaklık
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
