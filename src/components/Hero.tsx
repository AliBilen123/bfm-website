"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary via-primary-light to-accent overflow-hidden">
      {/* Team photo — absolute, full height of section, right half */}
      <div className="hidden lg:block absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0 w-[55%]">
          <Image
            src="/images/team.jpg"
            alt="Mehmet und Ali — BFM Gründer"
            fill
            className="object-cover object-top grayscale opacity-50"
            priority
          />
        </div>
        {/* Smooth fade from left — wide gradient covering the seam */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary from-35% via-primary/95 via-45% to-transparent to-75%" />
        {/* Fade bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
        {/* Fade top */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-light/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 w-full">
        <div className="lg:max-w-xl text-center lg:text-left">
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
              <div className="text-3xl font-extrabold text-white"><AnimatedCounter target={70} suffix="+" /></div>
              <div className="text-sm text-white/80 mt-1">Schüler*innen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white"><AnimatedCounter target={5} suffix="+" /></div>
              <div className="text-sm text-white/80 mt-1">Jahre</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-white"><AnimatedCounter target={100} suffix="%" /></div>
              <div className="text-sm text-white/80 mt-1">Zufriedenheit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
