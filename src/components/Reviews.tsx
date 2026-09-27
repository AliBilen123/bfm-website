"use client";

import { useTranslations } from "next-intl";
import { reviews, REVIEW_COUNT, REVIEW_AVERAGE, GOOGLE_PROFILE_URL } from "@/lib/reviews";

const STAR_PATH =
  "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";

function Stars({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`${className} text-yellow-400`} fill="currentColor" viewBox="0 0 20 20">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  );
}

function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export default function Reviews() {
  const t = useTranslations("reviews");
  const originalNote = t("originalNote");
  const average = REVIEW_AVERAGE.toFixed(1).replace(".", ",");

  return (
    <section id="reviews" className="py-20 bg-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-3">
          {t("sectionTitle")}
        </h2>
        <p className="text-center text-gray-600 mb-8">{t("subtitle")}</p>

        {/* Gesamtwertung */}
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mb-12 flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-white px-5 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <GoogleG className="w-6 h-6" />
          <span className="text-2xl font-extrabold text-primary" dir="ltr">{average}</span>
          <Stars />
          <span className="text-sm text-gray-600">{t("summary", { count: REVIEW_COUNT })}</span>
        </a>

      </div>

      {/* Laufband: Bewertungen laufen von rechts nach links, Pause bei Hover.
          Texte bleiben in allen Sprachen im deutschen Original. */}
      <div className="reviews-marquee group relative mx-auto max-w-5xl overflow-hidden py-2" dir="ltr">
        <div className="reviews-track flex w-max items-start gap-6 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((review, i) => (
            <figure
              key={i}
              aria-hidden={i >= reviews.length || undefined}
              className={`w-[280px] sm:w-[360px] shrink-0 flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-gray-200 ${
                i >= reviews.length ? "reviews-dup" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Stars />
                <GoogleG />
              </div>
              <blockquote lang="de" className="flex-1 text-gray-700 leading-relaxed">
                &bdquo;{review.text}&ldquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {review.name.charAt(0).toUpperCase()}
                </span>
                <span>
                  <span className="block font-bold text-primary">{review.name}</span>
                  <span className="block text-xs text-gray-500" dir="auto">
                    {review.role ? `${t(review.role)} · ` : ""}
                    {t("source")}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors"
          >
            <GoogleG />
            {t("allOnGoogle")}
          </a>
          {originalNote && <p className="text-xs text-gray-500">{originalNote}</p>}
        </div>
      </div>
    </section>
  );
}
