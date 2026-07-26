"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  once?: boolean;
  amount?: number;
  className?: string;
};

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  once = true,
  amount = 0.25,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  fast = false,
}: {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: fast ? 0.06 : 0.12,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
