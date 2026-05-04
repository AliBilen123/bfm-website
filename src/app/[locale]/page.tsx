import { setRequestLocale } from "next-intl/server";
import Script from "next/script";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "BFM — Bildung für Mühlacker",
            description: "Qualifizierte Nachhilfe in Mühlacker",
            url: "https://bfm-muehlacker.de",
            telephone: "+491743889692",
            email: "info@bfm-muehlacker.de",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Philipp-Bauer-Weg 2",
              addressLocality: "Mühlacker",
              postalCode: "75417",
              addressCountry: "DE",
            },
            areaServed: "Mühlacker",
            founder: ["Mehmet Futsi", "Ali Bilen"],
          }),
        }}
      />
      <Hero />
      <AboutUs />
      <Services />
      <Pricing />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
