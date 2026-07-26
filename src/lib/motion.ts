export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const;
export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
  page: 0.85,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easeEditorial },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easeOutQuart },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easeEditorial },
  },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easeEditorial },
  },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easeEditorial },
  },
};

export const clipReveal = {
  hidden: { clipPath: "inset(12% 12% 12% 12%)", scale: 1.08, opacity: 0.6 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: easeEditorial },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};
