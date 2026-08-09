"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MenuItemRow } from "@/components/MenuItemCard";
import { SignatureDivider } from "@/components/SignatureDivider";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Category, MenuItem } from "@/lib/types";
import { fadeUp } from "@/lib/motion";

type CategoryGroup = {
  category: Category;
  items: MenuItem[];
};

export function MenuView({ byCategory }: { byCategory: CategoryGroup[] }) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-tertiary pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto mb-12 max-w-[1200px] px-margin-mobile md:mb-section-gap md:px-margin-desktop">
          <div className="mx-auto max-w-3xl space-y-4 text-center sm:space-y-6">
            <TextReveal
              text="Menümüz"
              className="font-display text-[40px] font-medium text-inverse-on-surface sm:text-[48px] md:text-[64px]"
            />
            <Reveal variants={fadeUp}>
              <p className="font-body text-base leading-relaxed text-surface-variant sm:text-lg">
                Mevsimlik malzemelerden özenle seçilmiş bir koleksiyon. Fransız mutfak geleneği ile
                modern lezzet anlayışının dengesi.
              </p>
            </Reveal>
          </div>
          <SignatureDivider light />
        </section>

        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          {byCategory.map((group, index) => (
            <div key={group.category.id}>
              {index > 0 && <SignatureDivider icon="restaurant" light />}
              <div className="mb-16 md:mb-section-gap">
                <Reveal className="mb-6 sm:mb-10">
                  <h2 className="mb-3 font-display text-[28px] font-medium text-inverse-on-surface sm:mb-4 sm:text-[36px] md:text-[48px]">
                    {group.category.name}
                  </h2>
                  {group.category.description && (
                    <p className="max-w-2xl font-body text-sm text-surface-variant sm:text-base">
                      {group.category.description}
                    </p>
                  )}
                </Reveal>
                <Stagger className="space-y-8 sm:space-y-12" fast>
                  {group.items.map((item) => (
                    <MenuItemRow key={item.id} item={item} light />
                  ))}
                </Stagger>
              </div>
            </div>
          ))}
          {byCategory.length === 0 && (
            <p className="text-center font-body text-surface-variant">
              Menü yakında güncellenecek.
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
