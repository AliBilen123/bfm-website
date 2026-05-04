import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
      <Pricing />
    </>
  );
}
