# BFM Website — Design Spec

## Überblick

Neue Website für **BFM — Bildung für Mühlacker** (Mehmet Futsi & Ali Bilen GbR). Ersetzt die aktuelle IONOS-Website (15€/Monat) durch eine selbst gehostete, moderne Next.js-Website auf GitHub Pages (kostenlos).

**USP**: Qualität und persönliches Engagement — "Wir stehen mit unserem Gesicht vor unserer Nachhilfe."

## Technologie-Stack

| Komponente       | Technologie                          |
|-----------------|--------------------------------------|
| Framework       | Next.js 14 (Static Export via `output: 'export'`) |
| Styling         | Tailwind CSS                         |
| Sprachen        | Deutsch + Türkisch (next-intl)       |
| Kontaktformular | Formspree (kostenlos bis 50/Monat)   |
| Hosting         | GitHub Pages                         |
| Domain          | bfm-muehlacker.de (bestehend)        |

## Farbschema

| Rolle        | Farbe     | Hex       |
|-------------|-----------|-----------|
| Primary     | Dunkelblau | `#1e3a5f` |
| Accent      | Blau       | `#3b82f6` |
| Hintergrund | Weiß + helles Blaugrau | `#ffffff` / `#f0f4f8` |
| Text        | Dunkelgrau | `#1f2937` |

## Seitenstruktur

### Startseite (One-Pager, Sektionen per Scroll)

#### 1. Hero
- Große Headline: z.B. "Qualifizierte Nachhilfe in Mühlacker"
- Subtext: Kurze Beschreibung des Angebots
- CTA-Button: "Jetzt anfragen" → scrollt zum Kontaktformular
- Hintergrundbild oder Gradient

#### 2. Über uns
- Fotos von Mehmet & Ali
- Kurze persönliche Vorstellung mit Qualifikationen
- Betonung: lokal, persönlich, kompetent

#### 3. Leistungen
- Drei Bereiche als Karten:
  - **Nachhilfe**: Alle Fächer (Mathe, Naturwissenschaften, Deutsch, Französisch, Englisch, Spanisch), Grundschule bis Abitur
  - **Prüfungsvorbereitung**: Abitur, Real- und Hauptschulabschluss
  - **Bewerbungscoaching**: Bewerbungsunterlagen, Vorbereitung auf Gespräche

#### 4. Preise
- Drei Preiskarten nebeneinander:
  - **1x/Woche**: ab 95 €/Monat
  - **2x/Woche**: ab 165 €/Monat
  - **3x/Woche**: ab 220 €/Monat (hervorgehoben als "Beste Wahl" / "Beliebteste Option")
- Staffelrabatt visuell verdeutlichen
- CTA unter jeder Karte: "Jetzt anfragen"

#### 5. Bewertungen
- Manuell kuratierte Google Reviews
- Darstellung: Karten mit Name, Sternebewertung (5 Sterne), Zitat
- Mindestens 3-4 Reviews

#### 6. FAQ
- Aufklappbare Fragen (Accordion)
- Beispielfragen:
  - "Welche Fächer bietet ihr an?"
  - "Wie läuft eine Probestunde ab?"
  - "Wo findet die Nachhilfe statt?"
  - "Kann ich die Häufigkeit wechseln?"

#### 7. Kontakt
- Formspree-Formular: Name, E-Mail, Telefon (optional), Nachricht, Fach/Klasse (optional)
- Daneben/darunter: Kontaktdaten (Telefon, E-Mail, Adresse)
- Google Maps Embed (Philipp-Bauer-Weg 2, Mühlacker)

#### 8. Footer
- Social Media Links: Instagram, Facebook
- Links zu Impressum & Datenschutz
- Copyright

### Separate Seiten

#### /impressum
- Pflichtangaben nach §5 TMG
- Angaben: Mehmet Futsi & Ali Bilen GbR, Adresse, Kontakt, Verantwortlich für den Inhalt

#### /datenschutz
- Datenschutzerklärung nach DSGVO
- Abschnitte: Verantwortlicher, Datenerhebung, Formspree-Hinweis, Google Maps, Cookies, Rechte der Betroffenen

## Navigation

- **Desktop**: Fixierte Navbar oben — Logo links, Sektions-Links mittig, Sprachumschalter (DE/TR) rechts
- **Mobile**: Hamburger-Menü mit Slide-in Navigation
- Smooth Scroll zu allen Sektionen
- Aktive Sektion wird in der Navbar hervorgehoben

## Internationalisierung (i18n)

- Zwei Sprachen: Deutsch (Standard) und Türkisch
- Sprachumschalter in der Navbar (DE | TR)
- Alle Inhalte werden übersetzt: Navigation, Sektionen, Impressum, Datenschutz
- URL-Struktur: `/de/...` und `/tr/...`

## Responsive Design

- Mobile-first Ansatz
- Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- Preiskarten: horizontal auf Desktop, vertikal gestapelt auf Mobile
- Google Maps: volle Breite auf Mobile

## Performance & SEO

- Static Site Generation — alle Seiten als HTML vorgerendert
- Meta-Tags pro Seite (Title, Description, Open Graph)
- Strukturierte Daten (JSON-LD) für lokales Unternehmen
- Optimierte Bilder via next/image
- Lighthouse-Ziel: 90+ in allen Kategorien

## Kontaktformular (Formspree)

- Felder: Name (required), E-Mail (required), Telefon (optional), Fach/Klasse (optional), Nachricht (required)
- Erfolgsseite nach Absenden: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden."
- E-Mails gehen an: info@bfm-muehlacker.de

## Noch zu liefern (vom Kunden)

- Fotos von Mehmet & Ali (in `/Bilder` ablegen)
- 3-4 ausgewählte Google Reviews (Name + Text)
- Social Media URLs (Instagram, Facebook)
- Impressum-Details (falls abweichend von Website)
- FAQ-Antworten (oder wir formulieren Vorschläge)
- Türkische Übersetzungen der Inhalte (oder wir erstellen einen Entwurf)
