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
  const isDE = locale === "de";

  return {
    title: {
      default: isDE
        ? "BFM — Qualifizierte Nachhilfe in Mühlacker"
        : "BFM — Mühlacker'de Nitelikli Özel Ders",
      template: "%s | BFM Mühlacker",
    },
    description: isDE
      ? "Individuelle Nachhilfe in Mühlacker. Alle Fächer, Prüfungsvorbereitung und Bewerbungscoaching. Über 50 zufriedene Schüler."
      : "Mühlacker'de bireysel özel ders. Tüm dersler, sınav hazırlığı ve başvuru koçluğu.",
    openGraph: {
      title: "BFM — Bildung für Mühlacker",
      description: isDE
        ? "Ihre erste Wahl für qualifizierte Nachhilfe in Mühlacker"
        : "Mühlacker'de nitelikli özel ders için ilk tercihiniz",
      url: "https://bfm-muehlacker.de",
      siteName: "BFM Mühlacker",
      locale: isDE ? "de_DE" : "tr_TR",
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

  if (!routing.locales.includes(locale as "de" | "tr")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
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
