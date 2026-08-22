"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorShowcase } from "@/components/InteriorShowcase";
import { SignatureDivider } from "@/components/SignatureDivider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { fadeUp, slideFromRight } from "@/lib/motion";

const STORY_IMAGE_MAIN = "/3.jpg";
const STORY_IMAGE_ACCENT = "/2.jpg";

export function StoryView() {
  const { t, locale } = useLanguage();

  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <Reveal>
              <span className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                {t.story.label}
              </span>
            </Reveal>
            <TextReveal
              key={`story-title-${locale}`}
              text={t.story.title}
              className="mb-4 font-display text-[40px] font-medium text-primary sm:mb-6 sm:text-[48px] md:text-[64px]"
            />
            <Reveal variants={fadeUp}>
              <p className="font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
                {t.story.intro}
              </p>
            </Reveal>
          </div>

          <SignatureDivider />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-gutter">
            <Reveal
              variants={slideFromRight}
              className="md:col-span-4 md:sticky md:top-28 md:self-start">
              <h2 className="mb-4 font-display text-[28px] font-medium text-primary sm:mb-6 sm:text-[32px] md:text-[48px]">
                {t.story.sectionTitle}
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                {t.story.p1}
              </p>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                {t.story.p2}
              </p>
              <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-base">
                {t.story.p3}
              </p>
              <MagneticButton
                href="/reservations"
                className="flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-primary-container px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary sm:w-auto"
              >
                {t.story.reservation}
              </MagneticButton>
            </Reveal>

            <InteriorShowcase
              className="md:col-span-8"
              tallSrc={STORY_IMAGE_MAIN}
              tallAlt={t.story.showcaseTallAlt}
              wideSrc={STORY_IMAGE_ACCENT}
              wideAlt={t.story.showcaseWideAlt}
              caption={t.story.showcaseCaption}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
