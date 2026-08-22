"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MenuItemRow } from "@/components/MenuItemCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { localizedCategory, localizedMenuItem } from "@/lib/i18n/menu-locale";
import type { Category, MenuItem } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

type CategoryLink = {
  category: Category;
  itemCount: number;
};

export function MenuCategoryView({
  category,
  items,
  siblings,
}: {
  category: Category;
  items: MenuItem[];
  siblings: CategoryLink[];
}) {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const closeDetail = useCallback(() => setSelected(null), []);
  const categoryText = localizedCategory(category, locale);

  return (
    <>
      <Header />
      <main className="flex-1 bg-tertiary pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          <Reveal variants={fadeUp} className="mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => router.push("/menu")}
              className="mb-5 inline-flex min-h-11 items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-on-primary-container transition-colors hover:text-inverse-on-surface"
            >
              <span className="material-symbols-outlined text-base rtl:rotate-180">arrow_back</span>
              {t.menu.allCategories}
            </button>

            <h1 className="font-display text-[36px] font-medium leading-tight text-inverse-on-surface sm:text-[48px] md:text-[56px]">
              {categoryText.name}
            </h1>
            {categoryText.description && (
              <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-surface-variant sm:text-lg">
                {categoryText.description}
              </p>
            )}
            <p className="mt-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary-container">
              {t.menu.productCount(items.length)}
            </p>
            <LanguageSwitcher variant="dark" className="mt-5 justify-start" />
          </Reveal>

          {siblings.length > 1 && (
            <div
              className="-mx-margin-mobile mb-8 overflow-x-auto px-margin-mobile pb-1 md:-mx-0 md:mb-10 md:px-0"
              data-lenis-prevent
            >
              <div className="flex w-max gap-2 md:flex-wrap md:w-auto">
                {siblings.map(({ category: sibling }) => {
                  const active = sibling.id === category.id;
                  const siblingText = localizedCategory(sibling, locale);
                  return (
                    <Link
                      key={sibling.id}
                      href={`/menu/${sibling.id}`}
                      className={`inline-flex min-h-10 shrink-0 items-center rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        active
                          ? "bg-on-primary-container text-primary-container"
                          : "bg-white/5 text-surface-variant hover:bg-white/10 hover:text-inverse-on-surface"
                      }`}
                    >
                      {siblingText.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <p className="font-body text-surface-variant">{t.menu.noProductsInCategory}</p>
          ) : (
            <Stagger className="divide-y divide-white/10" fast>
              {items.map((item) => (
                <div key={item.id} className="py-5 first:pt-0 last:pb-0 sm:py-6">
                  <MenuItemRow item={item} light onSelect={setSelected} />
                </div>
              ))}
            </Stagger>
          )}
        </section>
      </main>
      <Footer />

      <ProductDetailModal
        item={selected}
        categoryName={categoryText.name}
        onClose={closeDetail}
      />
    </>
  );
}
