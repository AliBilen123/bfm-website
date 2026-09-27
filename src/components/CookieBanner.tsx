"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  readConsent,
  saveConsent,
  ConsentState,
  OPEN_SETTINGS_EVENT,
  CONSENT_EVENT,
} from "@/lib/consent";

const NONE: ConsentState = { statistics: false, marketing: false, maps: false };
const ALL: ConsentState = { statistics: true, marketing: true, maps: true };

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [choice, setChoice] = useState<ConsentState>(NONE);

  useEffect(() => {
    const stored = readConsent();
    if (stored) setChoice(stored);
    else setVisible(true);

    const open = () => {
      setChoice(readConsent() ?? NONE);
      setShowDetails(true);
      setVisible(true);
    };
    const sync = (e: Event) => setChoice((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    window.addEventListener(CONSENT_EVENT, sync);
    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, open);
      window.removeEventListener(CONSENT_EVENT, sync);
    };
  }, []);

  function decide(state: ConsentState) {
    saveConsent(state);
    setVisible(false);
    setShowDetails(false);
  }

  if (!visible) return null;

  const categories: { key: keyof ConsentState | "necessary"; locked?: boolean }[] = [
    { key: "necessary", locked: true },
    { key: "statistics" },
    { key: "marketing" },
    { key: "maps" },
  ];

  const btn =
    "px-5 py-2.5 text-sm font-semibold rounded-full transition-colors flex-1 sm:flex-none";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
    >
      <div className="mx-auto max-w-5xl">
        <h2 id="consent-title" className="text-base font-bold text-primary mb-1">
          {t("title")}
        </h2>
        <p className="text-sm text-gray-600">
          {t("message")}{" "}
          <Link href={`/${locale}/datenschutz/`} className="underline hover:text-primary">
            {t("privacyLink")}
          </Link>
        </p>

        {showDetails && (
          <div className="mt-4 space-y-3">
            {categories.map(({ key, locked }) => {
              const checked = locked ? true : choice[key as keyof ConsentState];
              return (
                <label
                  key={key}
                  className={`flex items-start gap-3 rounded-xl border border-gray-200 p-3 ${
                    locked ? "opacity-70" : "cursor-pointer hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-accent"
                    checked={checked}
                    disabled={locked}
                    onChange={(e) =>
                      setChoice((c) => ({ ...c, [key]: e.target.checked }))
                    }
                  />
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      {t(`categories.${key}.title`)}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {t(`categories.${key}.description`)}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
          {showDetails ? (
            <button
              onClick={() => decide(choice)}
              className={`${btn} bg-gray-100 text-gray-800 hover:bg-gray-200`}
            >
              {t("save")}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className={`${btn} bg-gray-100 text-gray-800 hover:bg-gray-200`}
            >
              {t("settings")}
            </button>
          )}
          <button
            onClick={() => decide(NONE)}
            className={`${btn} bg-primary text-white hover:bg-primary-dark`}
          >
            {t("rejectAll")}
          </button>
          <button
            onClick={() => decide(ALL)}
            className={`${btn} bg-primary text-white hover:bg-primary-dark`}
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
