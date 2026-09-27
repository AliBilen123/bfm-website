import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const langs = ["de", "en", "tr", "ar"] as const;
  return {
    title: t("impressum"),
    alternates: {
      canonical: `/${locale}/impressum/`,
      languages: Object.fromEntries(langs.map((l) => [l, `/${l}/impressum/`])),
    },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impressum");

  return (
    <section className="min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-8">
          {t("title")}
        </h1>
        <p className="text-gray-700 whitespace-pre-line">{t("content")}</p>
      </div>
    </section>
  );
}
