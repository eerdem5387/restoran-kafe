"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorShowcase } from "@/components/InteriorShowcase";
import { SignatureDivider } from "@/components/SignatureDivider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { fadeUp, slideFromRight } from "@/lib/motion";

const STORY_IMAGE_MAIN = "/3.jpg";
const STORY_IMAGE_ACCENT = "/2.jpg";

export function StoryView() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <Reveal>
              <span className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                Berray&apos;s
              </span>
            </Reveal>
            <TextReveal
              text="Hikâyemiz"
              className="mb-4 font-display text-[40px] font-medium text-primary sm:mb-6 sm:text-[48px] md:text-[64px]"
            />
            <Reveal variants={fadeUp}>
              <p className="font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
                Berray&apos;s Kitchen &amp; Cafe, günün her saatinde iyi yemek ve güzel sohbet
                için buluşabileceğiniz sıcak bir mekân.
              </p>
            </Reveal>
          </div>

          <SignatureDivider />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-gutter">
            <Reveal
              variants={slideFromRight}
              className="md:col-span-4 md:sticky md:top-28 md:self-start">
              <h2 className="mb-4 font-display text-[28px] font-medium text-primary sm:mb-6 sm:text-[32px] md:text-[48px]">
                Birlikte Güzel Vakit Geçirmek İçin.
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                Güne kahvaltıyla başlayabilir, kahvenizi yudumlayabilir veya akşam yemeğinde
                sevdiklerinizle aynı sofrayı paylaşabilirsiniz. Menümüzde burger, pizza, makarna,
                salata ve ana yemek seçenekleri bulunur.
              </p>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                Sıcak ve soğuk kahvelerimiz, taze içeceklerimiz ve tatlılarımızla günün her
                saatinde keyifli bir mola verebilirsiniz.
              </p>
              <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-base">
                Berray&apos;s Kitchen &amp; Cafe&apos;yi rahatça oturabileceğiniz, ailenizle ve
                arkadaşlarınızla güzel anılar biriktirebileceğiniz bir yer olarak hazırladık.
              </p>
              <MagneticButton
                href="/reservations"
                className="flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-primary-container px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary sm:w-auto"
              >
                Rezervasyon
              </MagneticButton>
            </Reveal>

            <InteriorShowcase
              className="md:col-span-8"
              tallSrc={STORY_IMAGE_MAIN}
              tallAlt="Berray's Kitchen & Cafe salonu"
              wideSrc={STORY_IMAGE_ACCENT}
              wideAlt="Berray's şömineli oturma alanı"
              caption="Salon & Şömine"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
