"use client";

import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignatureDivider } from "@/components/SignatureDivider";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Category } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

type CategoryCard = {
  category: Category;
  itemCount: number;
};

export function MenuView({
  categories,
  menuEnabled = true,
}: {
  categories: CategoryCard[];
  menuEnabled?: boolean;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-tertiary pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto mb-10 max-w-[1200px] px-margin-mobile md:mb-14 md:px-margin-desktop">
          <div className="mx-auto max-w-2xl space-y-4 text-center sm:space-y-5">
            <TextReveal
              text="Menümüz"
              className="font-display text-[40px] font-medium text-inverse-on-surface sm:text-[48px] md:text-[64px]"
            />
            <Reveal variants={fadeUp}>
              <p className="font-body text-base leading-relaxed text-surface-variant sm:text-lg">
                {menuEnabled
                  ? "Berray's menüsünü keşfetmek için bir kategori seçin."
                  : "Berray's menüsü şu an güncelleniyor. Çok yakında yeniden burada."}
              </p>
            </Reveal>
          </div>
          <SignatureDivider light />
        </section>

        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          {!menuEnabled ? (
            <div className="mx-auto max-w-md text-center">
              <p className="font-body text-sm leading-relaxed text-surface-variant sm:text-base">
                Fiyatları ve ürünleri yeniliyoruz. Bu sırada rezervasyon için bizi arayabilir veya
                formu doldurabilirsiniz.
              </p>
              <Link
                href="/reservations"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded bg-on-primary-container px-6 text-xs font-semibold uppercase tracking-wider text-primary-container transition-opacity hover:opacity-90"
              >
                Rezervasyon
              </Link>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center font-body text-surface-variant">
              Berray&apos;s menüsü çok yakında burada.
            </p>
          ) : (
            <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {categories.map(({ category, itemCount }, index) => (
                <StaggerItem key={category.id}>
                  <Link
                    href={`/menu/${category.id}`}
                    className="group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] px-5 py-5 transition-all duration-300 hover:border-on-primary-container/40 hover:bg-white/[0.07] sm:px-6 sm:py-6"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-on-primary-container">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="material-symbols-outlined text-lg text-on-primary-container transition-transform duration-300 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </div>
                      <h2 className="font-display text-[26px] font-medium leading-tight text-inverse-on-surface sm:text-[30px]">
                        {category.name}
                      </h2>
                      {category.description && (
                        <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-surface-variant">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <p className="mt-5 font-body text-xs font-semibold uppercase tracking-wider text-on-primary-container">
                      {itemCount} ürün
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
