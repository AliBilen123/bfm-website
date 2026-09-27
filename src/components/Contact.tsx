"use client";

import { useState, FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import MapEmbed from "@/components/MapEmbed";
import { track } from "@/lib/analytics";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/meenalwa", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
        track("generate_lead", { form_name: "kontakt" }, "lead");
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          {t("subtitle")}
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg
                  className="w-16 h-16 text-green-500 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg font-semibold text-primary">
                  {t("form.success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <label htmlFor="cf-name" className="sr-only">{t("form.name")}</label>
                <input
                  id="cf-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder={t("form.name")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <label htmlFor="cf-email" className="sr-only">{t("form.email")}</label>
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder={t("form.email")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <label htmlFor="cf-phone" className="sr-only">{t("form.phone")}</label>
                <input
                  id="cf-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={t("form.phone")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <label htmlFor="cf-subject" className="sr-only">{t("form.subject")}</label>
                <input
                  id="cf-subject"
                  type="text"
                  name="subject"
                  placeholder={t("form.subject")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <label htmlFor="cf-message" className="sr-only">{t("form.message")}</label>
                <textarea
                  id="cf-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t("form.message")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition resize-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-full bg-accent py-3 font-semibold text-white hover:bg-accent/90 transition-colors"
                >
                  {t("form.submit")}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  {t("form.privacyNotice")}{" "}
                  <a href={`/${locale}/datenschutz/`} className="underline hover:text-accent">
                    {t("form.privacyLink")}
                  </a>
                  .
                </p>

                {error && (
                  <p className="text-red-600 text-sm text-center">
                    {t("form.error")}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Info + Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-4">
              <div className="flex items-center gap-3">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href={`tel:${t("info.phone").replace(/\s/g, "")}`} data-track-location="contact" className="text-gray-700 hover:text-accent">{t("info.phone")}</a>
              </div>

              <div className="flex items-center gap-3">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href={`mailto:${t("info.email")}`} data-track-location="contact" className="text-gray-700 hover:text-accent">{t("info.email")}</a>
              </div>

              <div className="flex items-center gap-3">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{t("info.address")}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <MapEmbed />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
