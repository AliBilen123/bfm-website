"use client";

import { useTranslations } from "next-intl";

const planKeys = ["once", "twice", "thrice"] as const;

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          {t("subtitle")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {planKeys.map((key) => {
            const isPopular = key === "twice";
            const features = t.raw(`plans.${key}.features`) as string[];

            return (
              <div
                key={key}
                className={`relative rounded-2xl p-8 transition-all ${
                  isPopular
                    ? "border-2 border-accent scale-105 shadow-xl bg-white"
                    : "border border-gray-200 shadow-md bg-white"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                    {t("popular")}
                  </div>
                )}

                <h3 className="text-xl font-bold text-primary mb-2">
                  {t(`plans.${key}.title`)}
                </h3>

                <div className="mb-6">
                  <span className="text-sm text-gray-500">{t("from")} </span>
                  <span className="text-4xl font-extrabold text-primary">
                    {t(`plans.${key}.price`)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {" "}{t("perMonth")}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-5 h-5 text-accent flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full text-center rounded-full py-3 font-semibold transition-colors ${
                    isPopular
                      ? "bg-accent text-white hover:bg-accent-dark"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {t("cta")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
