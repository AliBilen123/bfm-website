"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-accent overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>
        <a
          href="#contact"
          className="inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-primary shadow-lg hover:scale-105 transition-transform"
        >
          {t("cta")}
        </a>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">50+</div>
            <div className="text-sm text-white/80 mt-1">Schüler</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">5+</div>
            <div className="text-sm text-white/80 mt-1">Jahre</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-extrabold text-white">100%</div>
            <div className="text-sm text-white/80 mt-1">Zufriedenheit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
