/**
 * Tracking-Konfiguration
 * ----------------------
 * IDs hier eintragen. Leere Werte = das jeweilige Tool wird NICHT geladen.
 *
 * GA4_ID:        Google Analytics 4 → Verwaltung → Datenstreams → "Mess-ID" (G-XXXXXXXXXX)
 * ADS_ID:        Google Ads → Tools → Conversions → Tag einrichten (AW-XXXXXXXXXX)
 * ADS_LABELS:    Pro Conversion-Aktion das "Conversion-Label" (Teil nach dem "/" in send_to)
 */
export const GA4_ID = "G-HHR9CBYW7Z";
export const ADS_ID = "";

export const ADS_LABELS = {
  lead: "", // Kontaktformular abgeschickt (Primäre Conversion)
  call: "", // Klick auf Telefonnummer
  whatsapp: "", // Klick auf WhatsApp
  email: "", // Klick auf E-Mail-Adresse
} as const;

export type AdsConversion = keyof typeof ADS_LABELS;
