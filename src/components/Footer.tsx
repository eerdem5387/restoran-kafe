"use client";

import { motion } from "motion/react";
import { Logo } from "@/components/Logo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { UnderlineLink } from "@/components/motion/MagneticButton";

export function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-tertiary pb-[max(2rem,env(safe-area-inset-bottom))] pt-16 text-on-tertiary md:pt-section-gap">
      <Reveal className="mx-auto max-w-[1200px] px-margin-mobile md:px-margin-desktop">
        <Stagger className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-gutter">
          <StaggerItem className="flex flex-col items-start gap-4">
            <Logo size="lg" className="text-almond" />
            <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-on-tertiary-container sm:text-base">
              Mutfak ustalığının sığınağı. Salı&apos;dan Pazar&apos;a, sofistike bir sıcaklık arayanlar
              için açık.
            </p>
          </StaggerItem>
          <StaggerItem className="flex flex-col gap-3 md:items-center">
            <nav className="flex flex-col gap-3 text-left md:text-center">
              {[
                { href: "/menu", label: "Menü" },
                { href: "/reservations", label: "Rezervasyon" },
                { href: "/story", label: "Hikâyemiz" },
                { href: "/admin", label: "Yönetim" },
              ].map((link) => (
                <UnderlineLink
                  key={link.href}
                  href={link.href}
                  className="w-max py-1 font-body text-xs font-semibold uppercase tracking-wider text-on-tertiary-container hover:text-on-tertiary md:mx-auto"
                >
                  {link.label}
                </UnderlineLink>
              ))}
            </nav>
          </StaggerItem>
          <StaggerItem className="flex flex-col justify-end md:items-end">
            <p className="font-body text-sm text-on-tertiary-container sm:text-base">
              © 2026 Berrays. Sofistike sıcaklık için.
            </p>
          </StaggerItem>
        </Stagger>
      </Reveal>
      <div className="pointer-events-none mt-12 flex justify-center gap-8 opacity-30 md:mt-16">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-12 w-px origin-bottom bg-gradient-to-t from-on-primary-container to-transparent sm:h-16"
            animate={{ opacity: [0.2, 0.7, 0.2], scaleY: [0.7, 1, 0.7] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: i * 0.45,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
}
