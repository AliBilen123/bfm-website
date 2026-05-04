"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TrialBanner() {
  const t = useTranslations("trial");

  return (
    <section className="py-12 bg-accent">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            {t("title")}
          </h2>
          <p className="text-white/90 mb-6 text-lg">
            {t("subtitle")}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-white text-accent font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-lg"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
