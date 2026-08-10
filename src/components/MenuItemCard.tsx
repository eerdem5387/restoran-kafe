"use client";

import { motion } from "motion/react";
import { MenuTags } from "@/components/MenuTags";
import { Price } from "@/components/Price";
import type { MenuItem } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

function ProductThumb({
  src,
  alt,
  light = false,
  className = "",
}: {
  src?: string;
  alt: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square shrink-0 overflow-hidden rounded ${
        light ? "bg-white/8 border border-white/10" : "bg-surface-container-low border border-outline-variant/30"
      } ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center font-body text-[10px] font-semibold uppercase tracking-[0.18em] ${
            light ? "text-on-primary-container" : "text-on-surface-variant"
          }`}
        >
          Yok
        </div>
      )}
    </div>
  );
}

export function MenuItemCard({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect?: (item: MenuItem) => void;
}) {
  const content = (
    <>
      <ProductThumb src={item.image} alt={item.name} className="w-24 sm:w-28 md:w-32" />
      <div className="flex min-w-0 flex-1 flex-col justify-center text-left">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <h3 className="font-display text-[22px] font-medium leading-tight text-primary transition-colors group-hover:text-primary-container sm:text-[26px] md:text-[30px]">
            {item.name}
          </h3>
          <Price
            value={item.price}
            className="font-display text-[20px] font-medium tracking-wide text-primary sm:text-[24px] md:text-[26px]"
          />
        </div>
        <MenuTags tags={item.tags} className="mt-2" />
      </div>
    </>
  );

  if (onSelect) {
    return (
      <motion.button
        type="button"
        variants={fadeUp}
        onClick={() => onSelect(item)}
        whileHover={{ y: -4, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
        className="soft-shadow group flex w-full gap-3 overflow-hidden rounded bg-surface-container-lowest p-3 text-left transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(75,54,33,0.1)] sm:gap-4 sm:p-4"
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="soft-shadow group flex gap-3 overflow-hidden rounded bg-surface-container-lowest p-3 transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(75,54,33,0.1)] sm:gap-4 sm:p-4"
    >
      {content}
    </motion.div>
  );
}

export function MenuItemRow({
  item,
  light = false,
  onSelect,
}: {
  item: MenuItem;
  light?: boolean;
  onSelect?: (item: MenuItem) => void;
}) {
  const titleColor = light ? "text-inverse-on-surface" : "text-primary";
  const titleHover = light
    ? "group-hover:text-on-primary-container"
    : "group-hover:text-primary-container";
  const priceColor = light ? "text-on-primary-container" : "text-primary";

  return (
    <motion.button
      type="button"
      variants={fadeUp}
      onClick={() => onSelect?.(item)}
      className="group flex w-full items-start gap-3 text-left sm:gap-4 md:gap-5"
      whileHover={{ x: 3, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      whileTap={{ scale: 0.99 }}
    >
      <ProductThumb src={item.image} alt={item.name} light={light} className="w-24 sm:w-28 md:w-32" />
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5">
          <h3
            className={`font-display text-[22px] font-medium leading-tight transition-colors sm:text-[26px] md:text-[30px] ${titleColor} ${titleHover}`}
          >
            {item.name}
          </h3>
          <Price
            value={item.price}
            className={`font-display text-[20px] font-medium tracking-wide sm:text-[24px] md:text-[26px] ${priceColor}`}
          />
        </div>
        <MenuTags tags={item.tags} light={light} className="mt-2" />
      </div>
    </motion.button>
  );
}
