"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xaqvedvy", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
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
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={t("form.name")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={t("form.email")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("form.phone")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder={t("form.subject")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-accent focus:ring focus:ring-accent/20 outline-none transition"
                />
                <textarea
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
                <span className="text-gray-700">{t("info.phone")}</span>
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
                <span className="text-gray-700">{t("info.email")}</span>
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d8.839!3d48.946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPhilipp-Bauer-Weg+2%2C+75417+M%C3%BChlacker!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
