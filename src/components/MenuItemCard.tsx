"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

function LeaderLine() {
  return (
    <motion.div
      className="menu-leader origin-left hidden min-w-[2rem] sm:block"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    />
  );
}

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="soft-shadow group flex flex-col overflow-hidden rounded bg-surface-container-lowest transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(75,54,33,0.1)]"
    >
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt={item.name} className="h-44 w-full object-cover sm:h-52" />
      )}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 sm:flex-nowrap">
          <h3 className="font-display text-[24px] font-medium leading-tight text-primary transition-colors group-hover:text-primary-container sm:text-[28px] md:text-[32px] md:leading-10">
            {item.name}
          </h3>
          <LeaderLine />
          <motion.span
            className="shrink-0 font-body text-xs font-semibold tracking-wider text-primary"
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {formatPrice(item.price)}
          </motion.span>
        </div>
        {item.description && (
          <p className="font-body text-sm leading-relaxed text-on-surface-variant sm:text-base">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function MenuItemRow({ item, light = false }: { item: MenuItem; light?: boolean }) {
  const titleColor = light ? "text-inverse-on-surface" : "text-primary";
  const descColor = light ? "text-surface-variant" : "text-on-surface-variant";
  const priceColor = light ? "text-inverse-on-surface" : "text-primary";

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
      whileHover={{ x: 4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
    >
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.name}
          className="h-28 w-full shrink-0 rounded object-cover sm:h-24 sm:w-32 md:h-28 md:w-36"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex w-full flex-wrap items-baseline gap-x-2 gap-y-1 sm:flex-nowrap">
          <h3
            className={`font-display text-[24px] font-medium leading-tight transition-colors group-hover:text-primary-container sm:text-[28px] md:text-[32px] md:leading-10 ${titleColor}`}
          >
            {item.name}
          </h3>
          <LeaderLine />
          <span className={`shrink-0 font-body text-xs font-semibold tracking-wider ${priceColor}`}>
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className={`mt-2 max-w-md font-body text-sm leading-relaxed sm:text-base ${descColor}`}>
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
