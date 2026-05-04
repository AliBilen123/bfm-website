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
        <div>
          {/* Text */}
          <div className="text-center lg:text-left lg:max-w-xl">
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

          {/* Team photo — fades into gradient, full height */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
            <Image
              src="/images/team.jpg"
              alt="Mehmet und Ali — BFM Gründer"
              fill
              className="object-cover object-top grayscale opacity-60"
              priority
            />
            {/* Fade into background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
