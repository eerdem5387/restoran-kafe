"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

type MagneticButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  strength?: number;
};

export function MagneticButton({
  href,
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedClass = `group relative inline-flex w-full items-center justify-center overflow-hidden sm:w-auto ${className}`;

  const inner = (
    <>
      <span className="absolute inset-0 translate-y-[105%] bg-secondary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-on-primary">
        {children}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex w-full max-w-full sm:w-auto"
      whileTap={{ scale: 0.97 }}
    >
      {href ? (
        <Link href={href} className={sharedClass}>
          {inner}
        </Link>
      ) : (
        <button type={type} disabled={disabled} onClick={onClick} className={sharedClass}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}

export function UnderlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`group relative inline-block ${className}`}>
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-right group-hover:scale-x-0" />
      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 delay-100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}
