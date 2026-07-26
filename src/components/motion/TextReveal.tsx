"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easeEditorial } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  mode?: "words" | "chars";
};

export function TextReveal({
  text,
  className,
  delay = 0,
  mode = "words",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const units = mode === "chars" ? Array.from(text) : text.split(" ");

  if (reduce) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <h1 className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {units.map((unit, i) => (
          <span key={`${unit}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: 2, opacity: 0 }}
              animate={{ y: "0%", rotate: 0, opacity: 1 }}
              transition={{
                duration: duration.slow,
                ease: easeEditorial,
                delay: delay + i * (mode === "chars" ? 0.02 : 0.055),
              }}
            >
              {unit === " " ? "\u00A0" : unit}
              {mode === "words" && i < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </h1>
  );
}
