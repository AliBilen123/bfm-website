"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutUs() {
  const t = useTranslations("about");

  const members = [
    {
      key: "mehmet",
      image: "/images/mehmet.jpg",
      linkedin: "https://www.linkedin.com/in/mehmet-futsi-9a4335211/",
    },
    {
      key: "ali",
      image: "/images/ali.jpg",
      linkedin: "https://de.linkedin.com/in/ali-bilen-149a521bb",
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

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {members.map((member) => (
            <div
              key={member.key}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 shadow-lg ring-4 ring-primary/10">
                <Image
                  src={member.image}
                  alt={t(`${member.key}.name`)}
                  fill
                  className="object-cover object-top"
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
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        {/* Unterrichtsbilder */}
        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/unterricht1.jpg"
              alt="Nachhilfe-Unterricht bei BFM"
              width={800}
              height={600}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/unterricht2.jpg"
              alt="Schüler im Unterricht bei BFM"
              width={800}
              height={600}
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
