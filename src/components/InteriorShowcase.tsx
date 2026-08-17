"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { easeEditorial } from "@/lib/motion";

type InteriorShowcaseProps = {
  /** 1200x1500 (4:5) */
  tallSrc: string;
  tallAlt: string;
  /** 1600x1200 (4:3) */
  wideSrc: string;
  wideAlt: string;
  caption?: string;
  className?: string;
};

/**
 * Stacked editorial pair, sized to the source ratios so nothing is cropped:
 * a full-width 4:3 frame above an inset 4:5 frame, drifting at different speeds.
 */
export function InteriorShowcase({
  tallSrc,
  tallAlt,
  wideSrc,
  wideAlt,
  caption,
  className = "",
}: InteriorShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const wideY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);
  const tallY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div ref={ref} className={`flex flex-col gap-4 sm:gap-6 ${className}`}>
      <motion.figure
        className="soft-shadow group relative aspect-[4/3] w-full overflow-hidden rounded-lg"
        initial={reduce ? false : { opacity: 0, clipPath: "inset(0% 0% 22% 0%)" }}
        whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: easeEditorial }}
      >
        <motion.img
          src={wideSrc}
          alt={wideAlt}
          style={reduce ? undefined : { y: wideY }}
          className="absolute inset-0 h-[107%] w-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.03]"
        />
      </motion.figure>

      <div className="flex flex-col gap-3 sm:ml-auto sm:w-[74%]">
        <motion.figure
          className="soft-shadow group relative aspect-[4/5] w-full overflow-hidden rounded-lg"
          initial={reduce ? false : { opacity: 0, y: 40, clipPath: "inset(18% 0% 0% 0%)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: easeEditorial, delay: 0.12 }}
        >
          <motion.img
            src={tallSrc}
            alt={tallAlt}
            style={reduce ? undefined : { y: tallY }}
            className="absolute inset-0 h-[108%] w-full object-cover transition-transform duration-[1.2s] ease-out will-change-transform group-hover:scale-[1.03]"
          />
        </motion.figure>

        {caption && (
          <div className="flex items-center gap-3">
            <motion.span
              className="h-px flex-1 origin-left bg-on-primary-container/50"
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easeEditorial, delay: 0.35 }}
            />
            <motion.span
              className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-on-primary-container"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeEditorial, delay: 0.5 }}
            >
              {caption}
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
}
