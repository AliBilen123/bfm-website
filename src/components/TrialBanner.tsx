"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TrialBanner() {
  const t = useTranslations("trial");

  return (
    <div className="relative z-20 -mb-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl -mt-12 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-2xl p-8 sm:p-10 text-center shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          {t("title")}
        </h2>
        <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-lg"
        >
          {t("cta")}
        </a>
      </motion.div>
    </div>
  );
}
