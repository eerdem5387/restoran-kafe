"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { clipReveal } from "@/lib/motion";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  intensity?: number;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  intensity = 18,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={reduce ? undefined : clipReveal}
    >
      <motion.img
        src={src}
        alt={alt}
        style={reduce ? undefined : { y, scale }}
        className={`h-full w-full object-cover will-change-transform ${imgClassName ?? ""}`}
      />
    </motion.div>
  );
}

export function KenBurnsBackground({
  src,
  mobileSrc,
  className,
  /** Tailwind object-position classes for responsive crop focus */
  positionClass = "object-center",
  mobilePositionClass,
}: {
  src: string;
  mobileSrc?: string;
  className?: string;
  positionClass?: string;
  mobilePositionClass?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-[-6%] h-[112%] w-[112%]"
        initial={reduce ? false : { scale: 1.08 }}
        animate={reduce ? undefined : { scale: 1.02 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        {mobileSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mobileSrc}
              alt=""
              aria-hidden
              className={`absolute inset-0 h-full w-full object-cover md:hidden ${mobilePositionClass ?? "object-center"}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden
              className={`absolute inset-0 hidden h-full w-full object-cover md:block ${positionClass}`}
            />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt=""
            aria-hidden
            className={`h-full w-full object-cover ${positionClass}`}
          />
        )}
      </motion.div>
    </div>
  );
}
