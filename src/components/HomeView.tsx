"use client";

import { motion } from "motion/react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorShowcase } from "@/components/InteriorShowcase";
import { SignatureDivider } from "@/components/SignatureDivider";
import { MagneticButton, UnderlineLink } from "@/components/motion/MagneticButton";
import { KenBurnsBackground } from "@/components/motion/ParallaxImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

const HERO_IMAGE = "/anasayfa-banner.jpg";
const ABOUT_IMAGE_MAIN = "/3.jpg";
const ABOUT_IMAGE_ACCENT = "/2.jpg";

export function HomeView() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <section className="relative flex min-h-[78svh] w-full items-start justify-center overflow-hidden pt-6 sm:pt-10 md:min-h-[600px] md:h-[819px] md:pt-16">
          <KenBurnsBackground
            src={HERO_IMAGE}
            positionClass="object-[50%_62%] sm:object-[50%_58%] md:object-[50%_60%]"
          />
          {/* Wash from the top: hides the skyline clutter, keeps the venue clear */}
          <div className="absolute inset-0 bg-surface/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--surface)_0%,rgba(252,249,248,0.82)_26%,rgba(252,249,248,0)_58%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-surface to-transparent" />
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-margin-mobile text-center md:px-margin-desktop">
            <TextReveal
              text="Sofistike Sıcaklık İçin"
              className="mb-4 font-display text-[36px] font-medium leading-[1.15] text-primary [text-shadow:0_2px_20px_rgba(252,249,248,0.85)] sm:mb-6 sm:text-[48px] md:text-[80px]"
              delay={0.35}
            />
            <motion.p
              className="mb-8 max-w-2xl font-body text-base leading-relaxed text-on-surface-variant [text-shadow:0_1px_14px_rgba(252,249,248,0.9)] sm:mb-10 sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              El yapımı mutfak gelenekleri, modern bir sığınağın sakin konforuyla buluşuyor.
              Uzun süre hatırlanacak lezzetleri deneyimleyin.
            </motion.p>
            <motion.div
              className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <MagneticButton
                href="/reservations"
                className="flex min-h-12 w-full items-center justify-center rounded bg-primary-container px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary shadow-md sm:w-auto"
              >
                Rezervasyon
              </MagneticButton>
              <MagneticButton
                href="/menu"
                className="flex min-h-12 w-full items-center justify-center rounded border border-on-primary-container bg-transparent px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-primary sm:w-auto"
              >
                Menüyü Gör
              </MagneticButton>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="rounded-full bg-surface/85 px-3.5 py-1.5 font-body text-[11px] font-bold uppercase tracking-[0.28em] text-primary shadow-sm backdrop-blur-sm sm:text-xs">
              Kaydır
            </span>
            <motion.span
              className="block h-10 w-px bg-primary/70"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        <SignatureDivider />

        <section className="mx-auto max-w-[1200px] px-margin-mobile py-16 md:px-margin-desktop md:py-section-gap">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-gutter">
            <Stagger className="flex flex-col items-start md:col-span-4 md:sticky md:top-28 md:self-start">
              <StaggerItem>
                <span className="mb-3 block font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                  Mirasımız
                </span>
              </StaggerItem>
              <StaggerItem>
                <h2 className="mb-4 font-display text-[28px] font-medium leading-tight text-primary sm:mb-6 sm:text-[36px] md:text-[48px] md:leading-[56px]">
                  Sade Malzemelerin Senfonisi.
                </h2>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                  Bir yemeğin kaçış olması gerektiğine inanarak kurulan Berray&apos;s, gereksiz
                  olanı bir kenara bırakır; olağanüstü malzemeler, titiz hazırlık ve sizi durmaya
                  davet eden bir ortam.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-base">
                  Ahşap tavanlar, taş duvarlar ve sıcak ışığın buluştuğu salonumuz; kendi oturma
                  odanızın bir uzantısı gibi hissettirmek için tasarlandı.
                </p>
              </StaggerItem>
              <StaggerItem>
                <UnderlineLink
                  href="/story"
                  className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
                >
                  Hikâyemizi Keşfedin
                </UnderlineLink>
              </StaggerItem>
            </Stagger>

            <InteriorShowcase
              className="md:col-span-8"
              tallSrc={ABOUT_IMAGE_MAIN}
              tallAlt="Berray's Kitchen & Cafe salonu"
              wideSrc={ABOUT_IMAGE_ACCENT}
              wideAlt="Berray's şömineli oturma alanı"
              caption="Salon & Şömine"
            />
          </div>
        </section>

        <section className="relative overflow-hidden bg-tertiary px-margin-mobile py-16 md:px-margin-desktop md:py-section-gap">
          <motion.div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <Reveal className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.span
              className="material-symbols-outlined mb-4 text-4xl text-on-primary-container sm:mb-6"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              chair_alt
            </motion.span>
            <h2 className="mb-4 font-display text-[32px] font-medium text-on-tertiary sm:mb-6 sm:text-[48px] md:text-[56px]">
              Masanızı Ayırtın
            </h2>
            <p className="mb-8 max-w-xl font-body text-base leading-relaxed text-on-tertiary-container sm:mb-12 sm:text-lg">
              Sizi aramızda görmeyi çok isteriz. Kesintisiz bir deneyim için akşam servisinde
              rezervasyon önerilir.
            </p>
            <MagneticButton
              href="/reservations"
              className="flex min-h-12 w-full max-w-xs items-center justify-center rounded bg-primary-container px-10 py-4 font-body text-xs font-semibold uppercase tracking-wider text-on-primary sm:w-auto"
            >
              Rezervasyon Yap
            </MagneticButton>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
