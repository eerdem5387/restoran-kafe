"use client";

import { motion } from "motion/react";
import { MenuTags } from "@/components/MenuTags";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

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
        <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-[24px] font-medium leading-tight text-primary transition-colors group-hover:text-primary-container sm:text-[28px] md:text-[32px] md:leading-10">
            {item.name}
          </h3>
          <span className="font-display text-[22px] font-medium tracking-wide text-primary sm:text-[26px] md:text-[28px]">
            {formatPrice(item.price)}
          </span>
        </div>
        <MenuTags tags={item.tags} />
      </div>
    </motion.div>
  );
}

export function MenuItemRow({ item, light = false }: { item: MenuItem; light?: boolean }) {
  const titleColor = light ? "text-inverse-on-surface" : "text-primary";
  const priceColor = light ? "text-on-primary-container" : "text-primary";

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
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            className={`font-display text-[24px] font-medium leading-tight transition-colors group-hover:text-primary-container sm:text-[28px] md:text-[32px] md:leading-10 ${titleColor}`}
          >
            {item.name}
          </h3>
          <span
            className={`font-display text-[22px] font-medium tracking-wide sm:text-[26px] md:text-[28px] ${priceColor}`}
          >
            {formatPrice(item.price)}
          </span>
        </div>
        <MenuTags tags={item.tags} light={light} />
      </div>
    </motion.div>
  );
}
