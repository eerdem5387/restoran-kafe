"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeEditorial } from "@/lib/motion";

export function SignatureDivider({
  icon = "local_cafe",
  light = false,
}: {
  icon?: string;
  light?: boolean;
}) {
  const reduce = useReducedMotion();
  const line = light ? "bg-outline-variant" : "bg-on-primary-container";
  const iconColor = light ? "text-outline-variant" : "text-on-primary-container";

  return (
    <div className="flex items-center justify-center px-margin-desktop py-12 opacity-60">
      <motion.div
        className={`h-px w-24 origin-right ${line}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeEditorial }}
      />
      <motion.span
        className={`material-symbols-outlined mx-4 text-sm ${iconColor}`}
        initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -40 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: easeEditorial, delay: 0.2 }}
      >
        {icon}
      </motion.span>
      <motion.div
        className={`h-px w-24 origin-left ${line}`}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeEditorial }}
      />
    </div>
  );
}
