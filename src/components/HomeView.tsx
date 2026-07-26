"use client";

import { motion } from "motion/react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MenuItemCard } from "@/components/MenuItemCard";
import { SignatureDivider } from "@/components/SignatureDivider";
import { MagneticButton, UnderlineLink } from "@/components/motion/MagneticButton";
import { KenBurnsBackground, ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { MenuItem } from "@/lib/types";
import { slideFromLeft, slideFromRight } from "@/lib/motion";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuASKwP1QuUF9oFqxzezsZcOJNXtu-pQcjB8T9CCNrBotJFmgAuTQDBxfsRHVtjDtbfPR5BrOp6h7r2G6ejkcArG-jzkVBc2xi8WzxGqooVVEXcdKIBTgWeRzFYu1kJh1vG4DOoqT0LY5Z-R-pjj9P3TzXhlmNe9RVtD5JCtLtZyLvAK8EQq-q4aese9GnW9Oq78NUgC9PJG6VRA9byN1LkSnB77CFzAH7OIw9p-jBOcGMUxpZiBVExRU48xdz7na7C5aU_QzQE70A";

const ABOUT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvhHk6z7x00-s-BUPbi93kku5vCmU5JFrCzH7QWZAdY77_rlkHMcsSIWd3N1N9OxCSskK4E7aAKiXEXFq-0Z-yRzQ6nhjIoqavOxFhziHLhisVBQIPCRDVJcjYj36pS1Iu2nnD4UDyDBSVxMZp6DvqWow8-lC4Yfs78vAosQlsc2q1YBui794fn4cSziY1f6bA33tfc6NukpQyvQIFfbNaWCCjxnmoYdSVqOmRPAWPOIin4Ci-8ElxrjvxecWkYUF8SnsNs-ZBTw";

export function HomeView({ featured }: { featured: MenuItem[] }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <section className="relative flex min-h-[85svh] w-full items-center justify-center overflow-hidden md:min-h-[600px] md:h-[819px]">
          <KenBurnsBackground src={HERO_IMAGE} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/50 to-transparent" />
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute bottom-[18%] h-24 w-px bg-gradient-to-t from-on-primary-container/40 to-transparent"
                style={{ left: `${18 + i * 16}%` }}
                animate={{ y: [0, -28, 0], opacity: [0.15, 0.55, 0.15] }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.35,
                }}
              />
            ))}
          </div>
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-margin-mobile pb-16 text-center md:px-margin-desktop md:pb-0">
            <TextReveal
              text="Sofistike Sıcaklık İçin"
              className="mb-4 font-display text-[36px] font-medium leading-[1.15] text-primary sm:mb-6 sm:text-[48px] md:text-[80px]"
              delay={0.35}
            />
            <motion.p
              className="mb-8 max-w-2xl font-body text-base leading-relaxed text-on-surface-variant sm:mb-10 sm:text-lg"
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
                Masa Ayırt
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
            className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
              Kaydır
            </span>
            <motion.span
              className="block h-10 w-px bg-primary/40"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </section>

        <SignatureDivider />

        <section className="mx-auto max-w-[1200px] px-margin-mobile py-16 md:px-margin-desktop md:py-section-gap">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-gutter">
            <Reveal
              variants={slideFromLeft}
              className="order-2 flex flex-col items-start md:order-1 md:col-span-5"
            >
              <span className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                Mirasımız
              </span>
              <h2 className="mb-4 font-display text-[28px] font-medium leading-tight text-primary sm:mb-6 sm:text-[36px] md:text-[48px] md:leading-[56px]">
                Sade Malzemelerin Senfonisi.
              </h2>
              <p className="mb-4 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-6 sm:text-base">
                Bir yemeğin kaçış olması gerektiğine inanarak kurulan L&apos;Arôme Bistro, gereksiz
                olanı bir kenara bırakır; olağanüstü malzemeler, titiz hazırlık ve sizi durmaya
                davet eden bir ortam.
              </p>
              <p className="mb-6 font-body text-sm leading-relaxed text-on-surface-variant sm:mb-8 sm:text-base">
                Mekânımız, kendi oturma odanızın bir uzantısı gibi hissettirmek için tasarlandı —
                eğer oturma odanız dünya standartlarında espresso ve el açması hamur işleri
                sunsaydı.
              </p>
              <UnderlineLink
                href="/story"
                className="font-body text-xs font-semibold uppercase tracking-wider text-primary"
              >
                Hikâyemizi Keşfedin
              </UnderlineLink>
            </Reveal>
            <Reveal
              variants={slideFromRight}
              className="relative order-1 mb-2 md:order-2 md:col-span-6 md:col-start-7 md:mb-0"
            >
              <div className="relative aspect-[4/5] w-full md:-mr-12">
                <ParallaxImage
                  src={ABOUT_IMAGE}
                  alt="Şefin özenle sunduğu bir tabak"
                  className="soft-shadow relative z-10 h-full w-full rounded"
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 z-0 hidden h-2/3 w-2/3 rounded bg-surface-container-low sm:block md:-bottom-6 md:-left-6"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-surface-container-low py-16 md:py-section-gap">
          <div className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
            <Reveal className="mb-10 flex flex-col items-center text-center sm:mb-16">
              <span className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-on-primary-container sm:mb-4">
                Özenle Seçilmişler
              </span>
              <h2 className="font-display text-[28px] font-medium text-primary sm:text-[36px] md:text-[48px]">
                Sabah & Öğle
              </h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-6 sm:gap-x-16 sm:gap-y-12 md:grid-cols-2">
              {featured.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </Stagger>
            <Reveal className="mt-10 text-center sm:mt-16">
              <MagneticButton
                href="/menu"
                className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded border border-on-primary-container px-8 py-3 font-body text-xs font-semibold uppercase tracking-wider text-primary sm:w-auto"
              >
                Tüm Menüyü Gör
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </MagneticButton>
            </Reveal>
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
