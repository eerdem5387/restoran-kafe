"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ReservationForm } from "@/components/ReservationForm";
import { SignatureDivider } from "@/components/SignatureDivider";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { fadeUp } from "@/lib/motion";
import { motion } from "motion/react";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3002.8247263447297!2d40.943179276331044!3d41.18198997132669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406645fd1ed47191%3A0x59b2ad7e5d6fba5f!2sBerray%E2%80%99s%20Kitchen%26%20Cafe!5e0!3m2!1str!2str!4v1786949333724!5m2!1str!2str";

const MAP_LINK =
  "https://www.google.com/maps/place/Berray%E2%80%99s+Kitchen%26+Cafe/@41.18198997132669,40.943179276331044,17z";

export function ReservationsView() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-margin-mobile pb-16 pt-28 sm:pt-[120px] md:px-margin-desktop md:pb-section-gap">
        <section className="mb-10 text-center sm:mb-16 md:mb-24">
          <TextReveal
            text="Berray's'ta Rezervasyon"
            className="mb-3 font-display text-[32px] font-medium text-primary sm:mb-4 sm:text-[36px] md:text-[48px]"
          />
          <Reveal variants={fadeUp}>
            <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
              Formu doldurun, masanızı sizin için ayıralım. Dilerseniz bizi telefonla da
              arayabilirsiniz.
            </p>
          </Reveal>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-gutter">
          <Reveal className="soft-shadow relative overflow-hidden rounded-xl bg-almond p-5 sm:p-8 md:p-12 lg:col-span-7">
            <motion.div
              className="pointer-events-none absolute -mr-16 -mt-16 top-0 right-0 h-32 w-32 rounded-full bg-secondary-container opacity-20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="mb-6 font-display text-[26px] font-medium text-primary sm:mb-8 sm:text-[32px]">
              Rezervasyon Formu
            </h2>
            <ReservationForm />
          </Reveal>

          <Stagger className="flex flex-col gap-6 sm:gap-8 lg:col-span-5 lg:pl-8">
            <StaggerItem>
              <motion.div
                className="soft-shadow rounded-xl border border-outline-variant/30 bg-surface p-5 sm:p-8"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="mb-5 font-display text-[26px] font-medium text-primary sm:mb-6 sm:text-[32px]">
                  İletişim
                </h3>
                <div className="space-y-5 font-body text-sm text-on-surface-variant sm:space-y-6 sm:text-base">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="material-symbols-outlined mt-0.5 text-secondary">location_on</span>
                    <div>
                      <Logo size="sm" href={null} className="mb-2 text-primary" />
                      <p>Hamidiye / Pazar / Rize</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-secondary">call</span>
                    <a href="tel:+905418080053" className="hover:text-primary">
                      0 (541) 808 00 53
                    </a>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="soft-shadow relative h-52 overflow-hidden rounded-xl border border-outline-variant/30 sm:h-64"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.45 }}
              >
                <iframe
                  title="Berray's Kitchen & Cafe konumu"
                  src={MAP_EMBED_SRC}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 bottom-3 left-3 z-10 rounded-lg bg-surface/90 px-4 py-2.5 text-center font-body text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur transition-opacity hover:bg-surface sm:right-4 sm:bottom-4 sm:left-4"
                >
                  Yol Tarifi Al
                </a>
              </motion.div>
            </StaggerItem>
          </Stagger>
        </div>

        <SignatureDivider />
      </main>
      <Footer />
    </>
  );
}
