"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { MenuTags } from "@/components/MenuTags";
import { easeEditorial } from "@/lib/motion";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/types";

type ProductDetailModalProps = {
  item: MenuItem | null;
  categoryName?: string;
  onClose: () => void;
};

export function ProductDetailModal({ item, categoryName, onClose }: ProductDetailModalProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!item) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.25 }}
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            data-lenis-prevent
            className="relative z-10 flex max-h-[92svh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface shadow-2xl sm:max-h-[85vh] sm:rounded-xl"
            initial={reduce ? false : { y: "100%", opacity: 0.96 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: "100%", opacity: 0.96 }}
            transition={{ duration: 0.4, ease: easeEditorial }}
          >
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                onClick={onClose}
                aria-label="Ürün detayını kapat"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain">
              {item.image ? (
                <div className="relative aspect-square w-full bg-surface-container-low">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-surface-container-low text-xs uppercase tracking-wider text-on-surface-variant">
                  Görsel yok
                </div>
              )}

              <div className="px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
                {categoryName && (
                  <p className="mb-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-on-primary-container">
                    {categoryName}
                  </p>
                )}
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2
                    id="product-detail-title"
                    className="font-display text-[28px] font-medium leading-tight text-primary sm:text-[34px]"
                  >
                    {item.name}
                  </h2>
                  <p className="font-display text-[26px] font-medium tracking-wide text-primary sm:text-[30px]">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <MenuTags tags={item.tags} className="mt-4" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
