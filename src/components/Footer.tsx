"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const contact = useTranslations("contact");
  const locale = useLocale();

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="BFM Logo"
              width={200}
              height={104}
              className="h-12 w-auto bg-white rounded-lg p-1 mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Bildung für Mühlacker — Ihre erste Wahl für qualifizierte Nachhilfe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">Navigation</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-white/60 hover:text-white transition-colors">{nav("about")}</a>
              <a href="#services" className="block text-white/60 hover:text-white transition-colors">{nav("services")}</a>
              <a href="#pricing" className="block text-white/60 hover:text-white transition-colors">{nav("pricing")}</a>
              <a href="#contact" className="block text-white/60 hover:text-white transition-colors">{nav("contact")}</a>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {contact("info.phone")}
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {contact("info.email")}
              </div>
              <div className="flex items-start gap-2 text-white/60">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {contact("info.address")}
              </div>
            </div>
          </div>

          {/* Rechtliches & Social */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/80">Rechtliches</h4>
            <div className="space-y-2 text-sm mb-6">
              <Link
                href={`/${locale}/impressum/`}
                className="block text-white/60 hover:text-white transition-colors"
              >
                {nav("impressum")}
              </Link>
              <Link
                href={`/${locale}/datenschutz/`}
                className="block text-white/60 hover:text-white transition-colors"
              >
                {nav("datenschutz")}
              </Link>
            </div>

            <h4 className="font-bold mb-3 text-sm uppercase tracking-wider text-white/80">Social Media</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/bfm_nachhilfe/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@bfm_nachhilfe"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.85z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/60">
          <span>{t("copyright")}</span>
          <span>{t("madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}
