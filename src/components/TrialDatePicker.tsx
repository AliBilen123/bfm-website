"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

/** Wochentage mit Schnuppertermin: 1 = Montag, 3 = Mittwoch, 4 = Donnerstag */
const TRIAL_WEEKDAYS = [1, 3, 4];
const SLOTS_VISIBLE = 6;
const SLOTS_MORE = 6;

export function nextTrialDates(count: number): Date[] {
  const dates: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + 1); // frühestens morgen
  while (dates.length < count) {
    if (TRIAL_WEEKDAYS.includes(d.getDay())) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

/** Eindeutiger deutscher Text für die Anfrage-E-Mail */
export function trialValue(d: Date) {
  const f = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  return `${f.format(d)}, 17:30–19:00 Uhr`;
}

/** Event, mit dem der Banner einen Termin im Formular vorauswählt */
export const TRIAL_SELECT_EVENT = "bfm:trial-select";

function isoDate(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export default function TrialDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const t = useTranslations("contact.form.trial");
  const locale = useLocale();
  const [dates, setDates] = useState<Date[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Termine erst im Browser berechnen, damit sie nie vom Build-Datum abhängen
  useEffect(() => {
    setDates(nextTrialDates(SLOTS_VISIBLE + SLOTS_MORE));
  }, []);

  // Auswahl aus dem Schnuppertag-Banner übernehmen
  useEffect(() => {
    const onSelect = (e: Event) => onChange((e as CustomEvent<string>).detail);
    window.addEventListener(TRIAL_SELECT_EVENT, onSelect);
    return () => window.removeEventListener(TRIAL_SELECT_EVENT, onSelect);
  }, [onChange]);

  const intlLocale = locale === "ar" ? "ar-EG" : locale;
  const fmtDay = new Intl.DateTimeFormat(intlLocale, { weekday: "short" });
  const fmtDate = new Intl.DateTimeFormat(intlLocale, { day: "2-digit", month: "2-digit" });

  const visible = showMore ? dates : dates.slice(0, SLOTS_VISIBLE);

  const chip = (active: boolean) =>
    `rounded-xl border px-3 py-2 text-sm text-center transition focus:outline-none focus-visible:ring focus-visible:ring-accent/40 ${
      active
        ? "border-orange-500 bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md scale-[1.03]"
        : "border-gray-200 bg-white text-gray-700 hover:border-orange-400 hover:text-orange-600"
    }`;

  return (
    <fieldset id="schnuppertag" className="scroll-mt-40 rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <legend className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-orange-600 shadow-sm">
        <span aria-hidden="true">🎁</span>
        {t("label")}
      </legend>
      <p className="mb-3 mt-1 text-xs text-gray-600">{t("hint")}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="radiogroup" aria-label={t("label")}>
        {visible.map((d) => {
          // Für die E-Mail an euch immer deutsch & eindeutig
          const v = trialValue(d);
          const active = value === v;
          return (
            <button
              key={isoDate(d)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(active ? "" : v)}
              className={chip(active)}
            >
              <span className="block font-semibold">
                {fmtDay.format(d)} {fmtDate.format(d)}
              </span>
              <span className={`block text-xs ${active ? "text-white/85" : "text-gray-500"}`}>
                {t("time")}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {!showMore && dates.length > SLOTS_VISIBLE ? (
          <button
            type="button"
            onClick={() => setShowMore(true)}
            className="text-sm font-medium text-orange-600 hover:underline"
          >
            {t("more")}
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          role="radio"
          aria-checked={value === ""}
          onClick={() => onChange("")}
          className={`text-sm ${value === "" ? "font-semibold text-primary" : "text-gray-500 hover:text-primary"}`}
        >
          {value === "" ? "✓ " : ""}
          {t("none")}
        </button>
      </div>
    </fieldset>
  );
}
