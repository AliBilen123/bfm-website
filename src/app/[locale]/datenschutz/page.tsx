import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("datenschutz");
  const sections = t.raw("sections") as Array<{
    heading: string;
    text: string;
  }>;

  return (
    <section className="min-h-screen py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-12">
          {t("title")}
        </h1>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-primary mb-3">
                {section.heading}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
