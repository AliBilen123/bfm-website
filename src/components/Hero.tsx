"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary via-primary-light to-accent overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 mb-10">
              {t("subtitle")}
            </p>
            <a
              href="#contact"
              className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg hover:scale-105 transition-transform"
            >
              {t("cta")}
            </a>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">70+</div>
                <div className="text-sm text-white/80 mt-1">Schüler*innen</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">5+</div>
                <div className="text-sm text-white/80 mt-1">Jahre</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-white">100%</div>
                <div className="text-sm text-white/80 mt-1">Zufriedenheit</div>
              </div>
            </div>
          </div>

          {/* Team photo */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-[420px] h-[320px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src="/images/team.jpg"
                alt="Mehmet und Ali — BFM Gründer"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
