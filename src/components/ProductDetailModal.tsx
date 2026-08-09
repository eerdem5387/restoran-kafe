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
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.01 : 0.22 }}
        >
          <button
            type="button"
            aria-label="Kapat"
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            data-lenis-prevent
            className="relative z-10 w-full max-w-md overflow-hidden rounded-t-2xl bg-surface shadow-2xl sm:rounded-2xl"
            initial={reduce ? false : { y: 48, opacity: 0.98 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 48, opacity: 0.98 }}
            transition={{ duration: 0.35, ease: easeEditorial }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-outline-variant/25 px-4 py-3">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-on-primary-container">
                {categoryName || "Menü"}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Ürün detayını kapat"
                className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-surface-container-low"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="px-4 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-5">
              {/* Compact product header: square thumb + name/price */}
              <div className="flex items-start gap-3.5">
                <div className="relative aspect-square w-[7.5rem] shrink-0 overflow-hidden rounded-lg bg-surface-container-low sm:w-36">
                  {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-wider text-on-surface-variant">
                      Görsel yok
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h2
                    id="product-detail-title"
                    className="font-display text-[26px] font-medium leading-[1.15] text-primary sm:text-[30px]"
                  >
                    {item.name}
                  </h2>
                  <p className="mt-2 font-display text-[28px] font-medium tracking-wide text-primary-container sm:text-[32px]">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {/* Tags as product detail content */}
              <div className="mt-5 border-t border-outline-variant/25 pt-4">
                <p className="mb-3 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
                  İçerik / Notlar
                </p>
                {item.tags.length > 0 ? (
                  <MenuTags tags={item.tags} className="mt-0" />
                ) : (
                  <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                    Bu ürün için henüz etiket eklenmemiş.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex min-h-12 w-full items-center justify-center rounded bg-primary-container px-6 text-xs font-semibold uppercase tracking-wider text-on-primary"
              >
                Kapat
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
