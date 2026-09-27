"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { readConsent, saveConsent, CONSENT_EVENT, ConsentState } from "@/lib/consent";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d8.839!3d48.946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPhilipp-Bauer-Weg+2%2C+75417+M%C3%BChlacker!5e0!3m2!1sde!2sde!4v1";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Philipp-Bauer-Weg+2,+75417+M%C3%BChlacker";

/** Google Maps wird erst nach Einwilligung geladen (2-Klick-Lösung). */
export default function MapEmbed() {
  const t = useTranslations("map");
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(!!readConsent()?.maps);
    const sync = (e: Event) => setAllowed((e as CustomEvent<ConsentState>).detail.maps);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  function enable() {
    const c = readConsent() ?? { statistics: false, marketing: false, maps: false };
    saveConsent({ ...c, maps: true });
  }

  if (allowed) {
    return (
      <iframe
        src={MAP_SRC}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
      />
    );
  }

  return (
    <div className="h-[300px] bg-gray-100 flex flex-col items-center justify-center text-center p-6 gap-3">
      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <p className="text-sm text-gray-600 max-w-sm">{t("notice")}</p>
      <button
        onClick={enable}
        className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors"
      >
        {t("load")}
      </button>
      <a
        href={MAPS_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 underline hover:text-primary"
      >
        {t("openExternal")}
      </a>
    </div>
  );
}
