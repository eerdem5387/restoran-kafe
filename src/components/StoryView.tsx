"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignatureDivider } from "@/components/SignatureDivider";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { fadeUp, slideFromLeft, slideFromRight } from "@/lib/motion";
import { motion } from "motion/react";

const STORY_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvhHk6z7x00-s-BUPbi93kku5vCmU5JFrCzH7QWZAdY77_rlkHMcsSIWd3N1N9OxCSskK4E7aAKiXEXFq-0Z-yRzQ6nhjIoqavOxFhziHLhisVBQIPCRDVJcjYj36pS1Iu2nnD4UDyDBSVxMZp6DvqWow8-lC4Yfs78vAosQlsc2q1YBui794fn4cSziY1f6bA33tfc6NukpQyvQIFfbNaWCCjxnmoYdSVqOmRPAWPOIin4Ci-8ElxrjvxecWkYUF8SnsNs-ZBTw";

export function StoryView() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-28 pb-16 sm:pt-32 md:pb-section-gap">
        <section className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <Reveal>
              <span className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                Mirasımız
              </span>
            </Reveal>
            <TextReveal
              text="Hikâyemiz"
              className="mb-4 font-display text-[40px] font-medium text-primary sm:mb-6 sm:text-[48px] md:text-[64px]"
            />
            <Reveal variants={fadeUp}>
              <p className="font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
                Bir yemeğin kaçış olması gerektiğine inanarak — aceleci bir dünyada sofistike sıcaklık
                anı olarak.
              </p>
            </Reveal>
          </div>

          <SignatureDivider />

          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-gutter md:gap-12">
            <Reveal variants={slideFromLeft} className="relative md:col-span-5">
              <div className="relative aspect-[4/5] w-full">
                <ParallaxImage
                  src={STORY_IMAGE}
                  alt="L'Arôme Bistro'da özenle sunulan bir tabak"
                  className="soft-shadow relative z-10 h-full w-full rounded"
                />
                <motion.div
                  className="absolute -right-3 -bottom-3 z-0 hidden h-2/3 w-2/3 rounded bg-surface-container-low sm:block md:-right-4 md:-bottom-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                />
              </div>
            </Reveal>
            <Reveal variants={slideFromRight} className="md:col-span-6 md:col-start-7">
              <h2 className="mb-4 font-display text-[28px] font-medium text-primary sm:mb-6 sm:text-[32px] md:text-[48px]">
                Sade Malzemelerin Senfonisi.
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                L&apos;Arôme Bistro gereksiz olanı ayıklar; olağanüstü malzemeler, titiz hazırlık ve
                sizi durmaya davet eden bir ortam.
              </p>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                Mutfağımız Fransız geleneğinden beslenir, modern lezzet anlayışını kucaklar. Her tabak,
                ev karışımı espressomuzu kavurduğumuz özenle hazırlanır — yavaş, bilinçli ve derin.
              </p>
              <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-base">
                Mekânımız kendi oturma odanızın bir uzantısı gibi hissettirmek için tasarlandı — eğer
                oturma odanız dünya standartlarında espresso ve el açması hamur işleri sunsaydı.
              </p>
              <MagneticButton
                href="/reservations"
                className="flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-primary-container px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary sm:w-auto"
              >
                Masa Ayırt
              </MagneticButton>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
