"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

const partners = [
  {
    key: "but",
    image: null,
    label: "Bildung und Teilhabe",
  },
  {
    key: "rueckenwind",
    image: "/images/lernen-mit-rueckenwind.png",
    label: "Lernen mit Rückenwind",
  },
  {
    key: "arbeitsagentur",
    image: "/images/arbeitsagentur.png",
    label: "Agentur für Arbeit",
  },
  {
    key: "jobcenter",
    image: "/images/jobcenter.png",
    label: "Jobcenter",
  },
  {
    key: "kultus",
    image: "/images/kultusministerium.png",
    label: "Kultusministerium BW",
  },
];

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner) => (
            <div
              key={partner.key}
              className="flex flex-col items-center justify-center h-24 w-full"
            >
              {partner.image ? (
                <Image
                  src={partner.image}
                  alt={partner.label}
                  width={120}
                  height={60}
                  className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="px-4 py-3 bg-primary/10 rounded-xl border-2 border-primary/20">
                  <span className="text-sm font-bold text-primary text-center leading-tight block">
                    Bildung und
                    <br />
                    Teilhabe
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
