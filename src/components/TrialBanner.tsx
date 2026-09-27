"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { nextTrialDates, trialValue, TRIAL_SELECT_EVENT } from "@/components/TrialDatePicker";

export default function TrialBanner() {
  const t = useTranslations("trial");
  const bannerRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);
  const locale = useLocale();
  const [dates, setDates] = useState<Date[]>([]);
  const benefits = t.raw("benefits") as string[];

  useEffect(() => {
    setDates(nextTrialDates(3));
  }, []);

  const intlLocale = locale === "ar" ? "ar-EG" : locale;
  const fmtDay = new Intl.DateTimeFormat(intlLocale, { weekday: "long" });
  const fmtDayShort = new Intl.DateTimeFormat(intlLocale, { weekday: "short" });
  const fmtDate = new Intl.DateTimeFormat(intlLocale, { day: "2-digit", month: "2-digit" });

  function pick(d: Date) {
    window.dispatchEvent(new CustomEvent(TRIAL_SELECT_EVENT, { detail: trialValue(d) }));
    document.getElementById("schnuppertag")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full banner — inline */}
      <div ref={bannerRef} className="relative z-20 -mb-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl -mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 p-6 sm:p-10 shadow-2xl"
        >
          {/* Deko */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-300/30 blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ring-1 ring-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                {t("badge")}
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white">
                {t("title")}
              </h2>
              <p className="mt-3 text-white/90 text-lg">
                {t("subtitle")}
              </p>
              <ul className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Termine */}
            <div className="rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-sm font-semibold text-primary">{t("next")}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 min-h-[76px]">
                {dates.map((d) => (
                  <button
                    key={d.toISOString()}
                    type="button"
                    data-cta="trial_banner_date"
                    onClick={() => pick(d)}
                    className="group rounded-xl border-2 border-orange-100 bg-orange-50 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-orange-500 hover:bg-orange-500 hover:shadow-lg"
                  >
                    <span className="block text-xs font-medium text-orange-600 group-hover:text-white/90">
                      <span className="sm:hidden">{fmtDayShort.format(d)}</span>
                      <span className="hidden sm:inline">{fmtDay.format(d)}</span>
                    </span>
                    <span className="block text-lg sm:text-xl font-extrabold text-primary group-hover:text-white">
                      {fmtDate.format(d)}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-gray-500">{t("slots")}</p>
              <a
                href="#contact"
                data-cta="trial_banner"
                className="mt-4 block rounded-full bg-primary px-4 py-3 text-center text-sm sm:text-base font-bold text-white transition hover:bg-primary-light"
              >
                {t("cta")} →
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky compact bar — desktop only, appears when full banner scrolls out of view */}
      <div
        className={`hidden lg:block fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 shadow-md transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between">
          <p className="text-white font-semibold text-sm">
            {t("title")}
          </p>
          <a
            href="#contact"
            data-cta="trial_sticky"
            className="px-5 py-1.5 bg-white text-orange-600 font-bold rounded-full text-sm hover:scale-105 transition-transform"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </>
  );
}
