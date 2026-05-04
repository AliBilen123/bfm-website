"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function TrialBanner() {
  const t = useTranslations("trial");
  const bannerRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Full banner — inline */}
      <div ref={bannerRef} className="relative z-20 -mb-8 px-4">
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

      {/* Sticky compact bar — desktop only, appears when full banner scrolls out of view */}
      <div
        className={`hidden lg:block fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 shadow-md transition-all duration-300 ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between">
          <p className="text-white font-semibold text-sm">
            {t("title")}
          </p>
          <a
            href="#contact"
            className="px-5 py-1.5 bg-white text-orange-600 font-bold rounded-full text-sm hover:scale-105 transition-transform"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </>
  );
}
