import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    de: "BFM — Qualifizierte Nachhilfe in Mühlacker",
    en: "BFM — Qualified Tutoring in Mühlacker",
    tr: "BFM — Mühlacker'de Nitelikli Özel Ders",
    ar: "BFM — دروس خصوصية مؤهلة في مولاكر",
  };
  const descriptions: Record<string, string> = {
    de: "Individuelle Nachhilfe in Mühlacker. Alle Fächer, Prüfungsvorbereitung und Bewerbungscoaching. Über 50 zufriedene Schüler.",
    en: "Individual tutoring in Mühlacker. All subjects, exam preparation and application coaching. Over 50 satisfied students.",
    tr: "Mühlacker'de bireysel özel ders. Tüm dersler, sınav hazırlığı ve başvuru koçluğu.",
    ar: "دروس خصوصية فردية في مولاكر. جميع المواد، التحضير للامتحانات والتدريب على التقديم.",
  };
  const localeMap: Record<string, string> = {
    de: "de_DE", en: "en_US", tr: "tr_TR", ar: "ar_SA",
  };

  return {
    title: {
      default: titles[locale] || titles.de,
      template: "%s | BFM Mühlacker",
    },
    description: descriptions[locale] || descriptions.de,
    openGraph: {
      title: "BFM — Bildung für Mühlacker",
      description: descriptions[locale] || descriptions.de,
      url: "https://bfm-muehlacker.de",
      siteName: "BFM Mühlacker",
      locale: localeMap[locale] || "de_DE",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en" | "tr" | "ar")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className="bg-white text-gray-800 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
