"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutUs() {
  const t = useTranslations("about");

  const members = [
    {
      key: "mehmet",
      image: "/images/mehmet.jpg",
    },
    {
      key: "ali",
      image: "/images/ali.jpg",
    },
  ] as const;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
          {t("intro")}
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {members.map((member) => (
            <div
              key={member.key}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 shadow-lg ring-4 ring-primary/10">
                <Image
                  src={member.image}
                  alt={t(`${member.key}.name`)}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">
                {t(`${member.key}.name`)}
              </h3>
              <p className="text-accent font-medium mt-1">
                {t(`${member.key}.role`)}
              </p>
              <p className="text-gray-600 mt-3 max-w-sm leading-relaxed">
                {t(`${member.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
