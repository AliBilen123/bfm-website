"use client";

import { useEffect } from "react";
import { applyConsent, track } from "@/lib/analytics";
import { readConsent, CONSENT_EVENT, ConsentState } from "@/lib/consent";

/**
 * Initialisiert Tracking gemäß gespeicherter Einwilligung und misst
 * Klicks auf Telefon, WhatsApp, E-Mail sowie CTA-Buttons (data-cta).
 */
export default function Analytics() {
  useEffect(() => {
    const stored = readConsent();
    if (stored) applyConsent(stored);

    const onConsent = (e: Event) => applyConsent((e as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_EVENT, onConsent);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a, button[data-cta]") as HTMLElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const location = a.dataset.trackLocation || undefined;

      if (href.startsWith("tel:")) {
        track("click_call", { link_location: location }, "call");
      } else if (href.includes("wa.me/") || href.includes("whatsapp.com")) {
        track("click_whatsapp", { link_location: location }, "whatsapp");
      } else if (href.startsWith("mailto:")) {
        track("click_email", { link_location: location }, "email");
      } else if (a.dataset.cta) {
        track("cta_click", { cta_name: a.dataset.cta });
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
