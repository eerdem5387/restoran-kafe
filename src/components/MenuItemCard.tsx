"use client";

import { motion } from "motion/react";
import { MenuTags } from "@/components/MenuTags";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

function ProductImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square shrink-0 overflow-hidden rounded ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="soft-shadow group flex gap-3 overflow-hidden rounded bg-surface-container-lowest p-3 transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(75,54,33,0.1)] sm:gap-4 sm:p-4"
    >
      {item.image && (
        <ProductImage src={item.image} alt={item.name} className="w-24 sm:w-28 md:w-32" />
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <h3 className="font-display text-[22px] font-medium leading-tight text-primary transition-colors group-hover:text-primary-container sm:text-[26px] md:text-[30px]">
            {item.name}
          </h3>
          <span className="font-display text-[20px] font-medium tracking-wide text-primary sm:text-[24px] md:text-[26px]">
            {formatPrice(item.price)}
          </span>
        </div>
        <MenuTags tags={item.tags} className="mt-2" />
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
      className="group flex items-start gap-3 sm:gap-4 md:gap-5"
      whileHover={{ x: 3, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
    >
      {item.image && (
        <ProductImage src={item.image} alt={item.name} className="w-24 sm:w-28 md:w-32" />
      )}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <h3
            className={`font-display text-[22px] font-medium leading-tight transition-colors group-hover:text-primary-container sm:text-[26px] md:text-[30px] ${titleColor}`}
          >
            {item.name}
          </h3>
          <span
            className={`font-display text-[20px] font-medium tracking-wide sm:text-[24px] md:text-[26px] ${priceColor}`}
          >
            {formatPrice(item.price)}
          </span>
        </div>
        <MenuTags tags={item.tags} light={light} className="mt-2" />
      </div>
    </motion.div>
  );
}
