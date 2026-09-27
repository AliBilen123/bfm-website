export type ConsentState = {
  statistics: boolean; // Google Analytics
  marketing: boolean; // Google Ads Conversion-Tracking
  maps: boolean; // Google Maps (externe Medien)
};

const KEY = "bfm-consent-v1";
export const CONSENT_EVENT = "bfm-consent-change";
export const OPEN_SETTINGS_EVENT = "bfm-open-consent";

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return { statistics: !!p.statistics, marketing: !!p.marketing, maps: !!p.maps };
  } catch {
    return null;
  }
}

export function saveConsent(state: ConsentState) {
  const previous = readConsent();
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, ts: new Date().toISOString() }));
    localStorage.removeItem("cookies-accepted"); // Altes Banner
  } catch {
    /* Storage blockiert – Einwilligung gilt nur für diese Seitenansicht */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));

  // Widerruf von Statistik/Marketing: Google-Cookies löschen und neu laden,
  // damit keine Skripte mehr aktiv sind.
  const revoked =
    (previous?.statistics && !state.statistics) || (previous?.marketing && !state.marketing);
  if (revoked) {
    deleteGoogleCookies();
    window.location.reload();
  }
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

function deleteGoogleCookies() {
  const host = window.location.hostname;
  const domains = ["", host, "." + host, "." + host.replace(/^www\./, "")];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (/^(_ga|_gid|_gat|_gcl|_gac)/.test(name)) {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? "; domain=" + d : ""}`;
      });
    }
  });
}
