// Echte Google-Bewertungen, wörtlich übernommen (Kürzungen mit […] markiert).
// Bleiben in allen Sprachen im deutschen Original.
// Neue Bewertung: Eintrag ergänzen und REVIEW_COUNT anpassen.

export const REVIEW_COUNT = 20;
export const REVIEW_AVERAGE = 5.0;

// TODO: durch den direkten Link zum Google-Unternehmensprofil ersetzen
export const GOOGLE_PROFILE_URL =
  "https://www.google.com/maps/search/?api=1&query=BFM+Bildung+f%C3%BCr+M%C3%BChlacker";

export type Review = {
  name: string;
  role?: "parent" | "student";
  text: string;
};

export const reviews: Review[] = [
  {
    name: "Tanja G.",
    role: "parent",
    text: "Wenn Familien eine gute Unterstützung brauchen ist BFM die richtige Adresse. Auch wenn man es dem Kind zu Hause schon tausendmal erklärt hat, niemand erklärt es so gut und sympathisch wie Mehmet und Ali mit ihrem Team. Egal welches Fach, sie können fast alles. Für uns war es die richtige Anlaufstelle für Nachhilfe in Mühlacker. Danke BFM.",
  },
  {
    name: "Max",
    role: "student",
    text: "Nur zu empfehlen! Der Unterricht war immer sehr gut vorbereitet und verständlich erklärt. Besonders in schwierigen Themenbereichen wurde mir geduldig und kompetent geholfen. Dank der Nachhilfe habe ich nicht nur meine Noten verbessert sondern auch mehr Selbstvertrauen im Fach gewonnen. Sehr empfehlenswert!",
  },
  {
    name: "Esin S.",
    text: "Ich kann diese Nachhilfeschule nur weiterempfehlen! Das Team ist kompetent, freundlich und nimmt sich wirklich Zeit für jeden Schüler. Der Unterricht ist verständlich und individuell auf die Bedürfnisse der Schüler angepasst. Man merkt, dass hier mit viel Engagement und Leidenschaft unterrichtet wird.",
  },
  {
    name: "Moondi45",
    role: "student",
    text: "Ich bin insgesamt wirklich sehr zufrieden mit der Nachhilfe und kann sie definitiv weiterempfehlen. Mehmet Abi ist unglaublich kompetent und kann einem wirklich bei jedem Thema weiterhelfen. […] Das zeigt, wie engagiert und hilfsbereit das gesamte Team ist.",
  },
  {
    name: "Alexandra I.",
    role: "student",
    text: "Super Nachhilfe! Ich bin extrem zufrieden mit der Unterstützung, die ich erhalten habe. Die Nachhilfe war sehr hilfreich und hat mir geholfen, meine Noten zu verbessern. Der Nachhilfelehrer war freundlich, kompetent und hat sich sehr bemüht, mir die Themen zu erklären. Ich kann die Nachhilfe nur empfehlen!",
  },
  {
    name: "COE O.",
    text: "Sehr kompetent und zuversichtlich. Die Jungs hören genau zu und setzen es dann auch wirklich um. Danke nochmal & weiter so!",
  },
];
