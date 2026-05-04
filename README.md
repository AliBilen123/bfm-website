# BFM — Bildung für Mühlacker

Website für BFM Nachhilfe in Mühlacker. Next.js 14, Tailwind CSS, zweisprachig (DE/TR).

## Lokal starten

```bash
# Dependencies installieren
npm install

# Dev-Server starten
npm run dev
```

Dann im Browser öffnen: [http://localhost:3000/de/](http://localhost:3000/de/)

## Build

```bash
npm run build
```

Erzeugt statische Dateien im `out/`-Ordner.

## Deployment

Wird automatisch über GitHub Actions auf GitHub Pages deployed bei jedem Push auf `main`.

## Konfiguration

- **Formspree**: Form-ID in `src/components/Contact.tsx` eintragen
- **Bilder**: Team-Fotos in `public/images/` (mehmet.jpg, ali.jpg)
- **Übersetzungen**: `messages/de.json` (Deutsch), `messages/tr.json` (Türkisch)
