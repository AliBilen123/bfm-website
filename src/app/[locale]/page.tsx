import { setRequestLocale, getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import TrialBanner from "@/components/TrialBanner";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Partners from "@/components/Partners";
import SocialCTA from "@/components/SocialCTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import ScrollReveal from "@/components/ScrollReveal";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tFaq = await getTranslations("faq");
  const faqItems = tFaq.raw("items") as Array<{ question: string; answer: string }>;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "LocalBusiness"],
      "@id": "https://bfm-muehlacker.de/#organization",
      name: "BFM — Bildung für Mühlacker",
      legalName: "Mehmet Futsi & Ali Bilen GbR",
      description: "Qualifizierte Nachhilfe in Mühlacker: alle Fächer, Prüfungsvorbereitung und Bewerbungscoaching.",
      url: "https://bfm-muehlacker.de/",
      logo: "https://bfm-muehlacker.de/images/logo.png",
      image: "https://bfm-muehlacker.de/images/team.jpg",
      telephone: "+491743889692",
      email: "info@bfm-muehlacker.de",
      priceRange: "95–220 € / Monat",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Philipp-Bauer-Weg 2",
        addressLocality: "Mühlacker",
        postalCode: "75417",
        addressRegion: "Baden-Württemberg",
        addressCountry: "DE",
      },
      areaServed: [
        "Mühlacker", "Lomersheim", "Dürrmenz", "Enzberg",
        "Großglattbach", "Lienzingen", "Mühlhausen",
      ].map((name) => ({ "@type": "Place", name })),
      founder: [
        { "@type": "Person", name: "Mehmet Futsi" },
        { "@type": "Person", name: "Ali Bilen", honorificPrefix: "Dr.-Ing." },
      ],
      sameAs: [
        "https://www.instagram.com/bfm_nachhilfe/",
        "https://www.tiktok.com/@bfm_nachhilfe",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <>
      <script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrialBanner />
      <ScrollReveal><AboutUs /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><Pricing /></ScrollReveal>
      <ScrollReveal><Reviews /></ScrollReveal>
      <ScrollReveal><Partners /></ScrollReveal>
      <ScrollReveal><SocialCTA /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><Contact /></ScrollReveal>
    </>
  );
}
