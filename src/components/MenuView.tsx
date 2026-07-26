"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MenuItemRow } from "@/components/MenuItemCard";
import { SignatureDivider } from "@/components/SignatureDivider";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { CATEGORY_LABELS, type MenuCategory, type MenuItem } from "@/lib/types";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";

const CATEGORY_IMAGES: Partial<Record<MenuCategory, string>> = {
  "coffee-tea":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCX-EjlQEroXs-hvtNjnmKteG9FsHAlrYRRVOZe5hBkDs_nGM7_BSu6szKiB0WdmRtlz0hTmbZJH6Iy28Wy6zGG54dkG829klWVFOg86LqCiMl25YXZJpxmROVmbADgR1VbmwUGywqrgRPla7ZxoByJxpiy50cAyq8geAuk4T5x9Lg1X3Ha8eVprO02Z36Rv2iDDaiJ8SgztY9jgpFLkpNbIO6VBNGRHMfHZgIVIjaguYeMqoCdDqSUU6PSQjG024jud2WsxSwWqQ",
  "main-courses":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCtgrPaZl4VYLyWR5UCg8Lctrxi5pAleB7nLX2Frhsu_roYFszBqNDHSj_lV5xVT_sRvUAz9qOi3_amV3r2Ww2dRlWuL9grNA_YcfE1JJ0YcRzIdKDq6vduvi0_AAGOx6NyUr6-NcPtMG7gK1rMkoBMlkDkjkVd1gPYWQeM1sJhueUsqwb4LTFMQGN91fBPnxeX3RzWnl3VAOY4UzJO8thqtGRyLhfeIRMNuOCH7h0efProexa2oOHbeijVocrIh2MGnFda9e7F6w",
};

const CATEGORY_SUBTITLES: Record<MenuCategory, string> = {
  "coffee-tea": "Özenle kavrulmuş, dikkatle demlenmiş.",
  starters: "Zarif lezzetlerle hafif başlangıçlar.",
  "main-courses": "Duyuları rahatlatan ve memnun eden doyurucu, incelikli yemekler.",
  desserts: "Akşamınıza tatlı bir final.",
};

type CategoryGroup = {
  category: MenuCategory;
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
          {byCategory.map((group, index) => {
            const imageLeft = index % 2 === 0;
            const image = CATEGORY_IMAGES[group.category];

            return (
              <div key={group.category}>
                {index > 0 && <SignatureDivider icon="restaurant" light />}
                <div className="mb-16 md:mb-section-gap">
                  <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-gutter">
                    {image && imageLeft && (
                      <Reveal
                        variants={slideFromLeft}
                        className="relative h-[280px] overflow-hidden rounded-lg soft-shadow sm:h-[400px] md:sticky md:top-28 md:col-span-5 md:h-[600px]"
                      >
                        <ParallaxImage
                          src={image}
                          alt={CATEGORY_LABELS[group.category]}
                          className="absolute inset-0 h-full w-full"
                          intensity={24}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 text-on-primary sm:bottom-6 sm:left-6">
                          <h2 className="mb-1 font-display text-[28px] font-medium sm:mb-2 sm:text-[36px] md:text-[48px]">
                            {CATEGORY_LABELS[group.category]}
                          </h2>
                          <p className="font-body text-sm text-surface-container-lowest/90 sm:text-base">
                            {CATEGORY_SUBTITLES[group.category]}
                          </p>
                        </div>
                      </Reveal>
                    )}

                    <div
                      className={`space-y-8 sm:space-y-12 ${
                        image ? "md:col-span-7" : "md:col-span-12"
                      } ${imageLeft && image ? "md:pl-8" : ""} ${!imageLeft && image ? "order-2 md:order-1 md:pr-8" : ""}`}
                    >
                      {(!image || !imageLeft) && (
                        <Reveal className="mb-4 sm:mb-12">
                          <h2 className="mb-3 font-display text-[28px] font-medium text-inverse-on-surface sm:mb-4 sm:text-[36px] md:text-[48px]">
                            {CATEGORY_LABELS[group.category]}
                          </h2>
                          <p className="font-body text-sm text-surface-variant sm:text-base">
                            {CATEGORY_SUBTITLES[group.category]}
                          </p>
                        </Reveal>
                      )}
                      <Stagger className="space-y-8 sm:space-y-12" fast>
                        {group.items.map((item) => (
                          <MenuItemRow key={item.id} item={item} light />
                        ))}
                      </Stagger>
                    </div>

                    {image && !imageLeft && (
                      <Reveal
                        variants={slideFromRight}
                        className="relative order-1 h-[280px] overflow-hidden rounded-lg soft-shadow sm:h-[500px] md:order-2 md:col-span-5 md:h-[700px]"
                      >
                        <ParallaxImage
                          src={image}
                          alt={CATEGORY_LABELS[group.category]}
                          className="absolute inset-0 h-full w-full"
                          intensity={24}
                        />
                      </Reveal>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
