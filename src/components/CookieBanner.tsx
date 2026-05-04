"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 sm:p-6">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          {t("message")}
        </p>
        <button
          onClick={accept}
          className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark transition-colors flex-shrink-0"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  );
}
