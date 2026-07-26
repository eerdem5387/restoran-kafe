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

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDPaLJiRvJItee5vIY0G8FIpovE4wbEH5VkSJq3DltcZaZSd_A1zIanlnTMkevpFbU6vUBmYYrgjhSfrWm8cqZNX863bqCk3SThm2KVOtRuiZJOhbRGtLtm-CG3l9LhwWQJH36IalBb4Qw-ovWhju2fMbPg_DQhJKDzJ1ssrlmOpTq0pvGaq57lddTOI68CNLiCXIFN4Fu6mMfPvT-ikeeD88kLDXuXGzgpgVKOV6DsgUCss7Q5_ZAXllidL3pueWZLi9dOxevD6w";

export function ReservationsView() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-margin-mobile pb-16 pt-28 sm:pt-[120px] md:px-margin-desktop md:pb-section-gap">
        <section className="mb-10 text-center sm:mb-16 md:mb-24">
          <TextReveal
            text="Masanızı Ayırtın"
            className="mb-3 font-display text-[32px] font-medium text-primary sm:mb-4 sm:text-[36px] md:text-[48px]"
          />
          <Reveal variants={fadeUp}>
            <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
              Sofistike sıcaklık ve seçkin mutfak için bize katılın. Müsaitlik için önceden
              rezervasyon önerilir.
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
              Rezervasyon Bilgileri
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
                      <Logo size="sm" href={null} className="mb-2 object-left" />
                      <p>Culinary Caddesi No: 124</p>
                      <p>Gastronomy District, İstanbul</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-secondary">call</span>
                    <a href="tel:+905551234567" className="hover:text-primary">
                      +90 (555) 123 45 67
                    </a>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="material-symbols-outlined text-secondary">mail</span>
                    <a href="mailto:rezervasyon@laromebistro.com" className="break-all hover:text-primary">
                      rezervasyon@laromebistro.com
                    </a>
                  </div>
                </div>
                <div className="mt-6 border-t border-outline-variant/30 pt-6 sm:mt-8 sm:pt-8">
                  <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Çalışma Saatleri
                  </h4>
                  <ul className="space-y-2 font-body text-sm text-on-surface-variant sm:text-base">
                    <li className="flex justify-between gap-4">
                      <span>Pzt - Per:</span>
                      <span className="text-right">17:00 - 22:00</span>
                    </li>
                    <li className="flex justify-between gap-4 font-bold text-primary">
                      <span>Cum - Cmt:</span>
                      <span className="text-right">17:00 - 23:00</span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span>Pazar:</span>
                      <span className="text-right">16:00 - 21:00</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="soft-shadow group relative h-52 overflow-hidden rounded-xl border border-outline-variant/30 sm:h-64"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.45 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MAP_IMAGE}
                  alt="L'Arôme Bistro konum haritası"
                  className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div className="absolute right-3 bottom-3 left-3 rounded-lg bg-surface/90 px-4 py-2.5 text-center font-body text-xs font-semibold uppercase tracking-wider text-primary shadow-sm backdrop-blur sm:right-4 sm:bottom-4 sm:left-4">
                  Yol Tarifi Al
                </div>
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
