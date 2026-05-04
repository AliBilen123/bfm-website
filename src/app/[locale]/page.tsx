import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default function Home({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const t = useTranslations("hero");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </main>
  );
}
