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

export function KenBurnsBackground({ src, className }: { src: string; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-[-8%] bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')` }}
        initial={reduce ? false : { scale: 1.12, x: "-2%" }}
        animate={reduce ? undefined : { scale: 1.02, x: "2%" }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}
