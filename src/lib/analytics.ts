import { GA4_ID, ADS_ID, ADS_LABELS, AdsConversion } from "./tracking-config";
import type { ConsentState } from "./consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

let loaded = false;
let current: ConsentState = { statistics: false, marketing: false, maps: false };

/**
 * Lädt gtag.js erst NACH Einwilligung (kein Google-Request vorher).
 * Consent Mode v2 wird trotzdem gesetzt, damit Google die Einwilligung kennt.
 */
export function applyConsent(state: ConsentState) {
  current = state;
  const wantGa = state.statistics && !!GA4_ID;
  const wantAds = state.marketing && !!ADS_ID;
  if (!wantGa && !wantAds) return;

  if (!loaded) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}`;
    document.head.appendChild(s);
    loaded = true;
  }

  window.gtag!("consent", "update", {
    analytics_storage: state.statistics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: "denied", // Kein Remarketing
  });

  if (wantGa && !configured.ga) {
    window.gtag!("config", GA4_ID);
    configured.ga = true;
  }
  if (wantAds && !configured.ads) {
    window.gtag!("config", ADS_ID);
    configured.ads = true;
  }
}
const configured = { ga: false, ads: false };

/** Ereignis an GA4 senden und optional als Google-Ads-Conversion zählen. */
export function track(
  event: string,
  params: Record<string, unknown> = {},
  adsConversion?: AdsConversion
) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[track]", event, params, adsConversion ?? "");
  }
  if (typeof window === "undefined" || !window.gtag) return;
  if (current.statistics && GA4_ID) {
    window.gtag("event", event, { ...params, send_to: GA4_ID });
  }
  const label = adsConversion ? ADS_LABELS[adsConversion] : "";
  if (current.marketing && ADS_ID && label) {
    window.gtag("event", "conversion", { send_to: `${ADS_ID}/${label}` });
  }
}
