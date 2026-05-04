# BFM Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, bilingual (DE/TR) tutoring website for BFM Mühlacker, statically exported with Next.js and deployed on GitHub Pages.

**Architecture:** Next.js 14 App Router with `output: 'export'` for static generation. Internationalization via next-intl with `[locale]` route segment. Tailwind CSS for styling. Formspree for contact form submissions.

**Tech Stack:** Next.js 14, Tailwind CSS, next-intl, Formspree, GitHub Pages

---

## File Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with navbar + footer
│   │   ├── page.tsx            # Homepage (all sections)
│   │   ├── impressum/
│   │   │   └── page.tsx        # Impressum page
│   │   └── datenschutz/
│   │       └── page.tsx        # Datenschutz page
│   ├── layout.tsx              # HTML root layout
│   └── globals.css             # Tailwind imports + custom styles
├── components/
│   ├── Navbar.tsx              # Fixed navbar with language switcher
│   ├── Hero.tsx                # Hero section
│   ├── AboutUs.tsx             # About us section
│   ├── Services.tsx            # Services cards
│   ├── Pricing.tsx             # Pricing cards
│   ├── Reviews.tsx             # Google reviews
│   ├── FAQ.tsx                 # Accordion FAQ
│   ├── Contact.tsx             # Contact form + map
│   └── Footer.tsx              # Footer with social links
├── i18n/
│   ├── request.ts              # next-intl request config
│   └── routing.ts              # Locale routing config
└── messages/
    ├── de.json                 # German translations
    └── tr.json                 # Turkish translations
next.config.ts                  # Next.js config with static export
tailwind.config.ts              # Tailwind config with custom colors
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/alibilen/GitRepos/13_BFM
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Accept defaults. This creates the full Next.js project structure.

- [ ] **Step 2: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 3: Configure next.config.ts for static export and next-intl**

Replace `next.config.ts` with:

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 4: Configure Tailwind with custom colors**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e3a5f",
          light: "#2a4f7f",
          dark: "#152a45",
        },
        accent: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        surface: {
          DEFAULT: "#f0f4f8",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Update globals.css**

Replace `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", system-ui, sans-serif;
}
```

- [ ] **Step 6: Create root layout**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BFM - Bildung für Mühlacker",
  description: "Qualifizierte Nachhilfe in Mühlacker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds (may have warnings about missing i18n files, that's fine — we create them in Task 2).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and next-intl"
```

---

### Task 2: Internationalization Setup

**Files:**
- Create: `src/i18n/request.ts`, `src/i18n/routing.ts`, `src/messages/de.json`, `src/messages/tr.json`, `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create i18n routing config**

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "tr"],
  defaultLocale: "de",
});
```

- [ ] **Step 2: Create i18n request config**

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as "de" | "tr")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create German translation file**

Create `src/messages/de.json`:

```json
{
  "nav": {
    "about": "Über uns",
    "services": "Leistungen",
    "pricing": "Preise",
    "reviews": "Bewertungen",
    "faq": "FAQ",
    "contact": "Kontakt",
    "impressum": "Impressum",
    "datenschutz": "Datenschutz"
  },
  "hero": {
    "title": "Qualifizierte Nachhilfe in Mühlacker",
    "subtitle": "Unterstützung aus Mühlacker — für Mühlacker! Wir begleiten Schüler individuell auf ihrem Weg zum schulischen Erfolg.",
    "cta": "Jetzt anfragen"
  },
  "about": {
    "sectionTitle": "Über uns",
    "intro": "Wir sind Mehmet und Ali — zwei Mühlacker Jungs mit einer Mission: Schülern die bestmögliche Unterstützung zu bieten. Mit über 5 Jahren Erfahrung und mehr als 50 zufriedenen Schülern stehen wir persönlich für Qualität.",
    "mehmet": {
      "name": "Mehmet Futsi",
      "role": "Gründer & Nachhilfelehrer",
      "description": "Spezialisiert auf Naturwissenschaften und Mathematik. Leidenschaftlicher Pädagoge mit dem Ziel, Schülern nicht nur Wissen, sondern auch Selbstvertrauen zu vermitteln."
    },
    "ali": {
      "name": "Ali Bilen",
      "role": "Gründer & Nachhilfelehrer",
      "description": "Experte für Sprachen und geisteswissenschaftliche Fächer. Unterstützt Schüler mit individuellen Lernstrategien und gezielter Prüfungsvorbereitung."
    }
  },
  "services": {
    "sectionTitle": "Unsere Leistungen",
    "nachhilfe": {
      "title": "Nachhilfe",
      "description": "Individuelle Nachhilfe in allen Fächern — Mathematik, Naturwissenschaften, Deutsch, Englisch, Französisch und Spanisch. Von der Grundschule bis zum Abitur.",
      "features": ["Alle Fächer", "Grundschule bis Abitur", "Individuelle Betreuung"]
    },
    "pruefung": {
      "title": "Prüfungsvorbereitung",
      "description": "Gezielte Vorbereitung auf Abitur, Realschulabschluss und Hauptschulabschluss. Wir erarbeiten gemeinsam einen Lernplan und trainieren prüfungsrelevante Aufgaben.",
      "features": ["Abitur", "Realschulabschluss", "Hauptschulabschluss"]
    },
    "bewerbung": {
      "title": "Bewerbungscoaching",
      "description": "Professionelle Unterstützung bei Bewerbungen — von der Erstellung Ihrer Unterlagen bis zur Vorbereitung auf Vorstellungsgespräche.",
      "features": ["Bewerbungsunterlagen", "Vorstellungsgespräche", "Karriereberatung"]
    }
  },
  "pricing": {
    "sectionTitle": "Unsere Preise",
    "subtitle": "Transparent und fair — je häufiger, desto günstiger.",
    "perMonth": "/ Monat",
    "from": "ab",
    "cta": "Jetzt anfragen",
    "popular": "Beliebteste Wahl",
    "plans": {
      "once": {
        "title": "1x pro Woche",
        "price": "95",
        "features": ["1 Sitzung pro Woche", "Individueller Lernplan", "Alle Fächer verfügbar"]
      },
      "twice": {
        "title": "2x pro Woche",
        "price": "165",
        "features": ["2 Sitzungen pro Woche", "Individueller Lernplan", "Alle Fächer verfügbar", "Regelmäßige Fortschrittsberichte"]
      },
      "thrice": {
        "title": "3x pro Woche",
        "price": "220",
        "features": ["3 Sitzungen pro Woche", "Individueller Lernplan", "Alle Fächer verfügbar", "Regelmäßige Fortschrittsberichte", "Bester Preis pro Sitzung"]
      }
    }
  },
  "reviews": {
    "sectionTitle": "Das sagen unsere Schüler",
    "items": [
      {
        "name": "Elternstimme",
        "text": "Dank BFM hat mein Sohn seine Mathenote von einer 5 auf eine 2 verbessert. Die individuelle Betreuung ist hervorragend!",
        "rating": 5
      },
      {
        "name": "Schülerstimme",
        "text": "Super nette Nachhilfelehrer, die sich wirklich Zeit nehmen. Ich fühle mich jetzt viel sicherer in der Schule.",
        "rating": 5
      },
      {
        "name": "Elternstimme",
        "text": "Sehr professionell und zuverlässig. Die Prüfungsvorbereitung hat meiner Tochter sehr geholfen. Klare Empfehlung!",
        "rating": 5
      }
    ]
  },
  "faq": {
    "sectionTitle": "Häufige Fragen",
    "items": [
      {
        "question": "Welche Fächer bietet ihr an?",
        "answer": "Wir bieten Nachhilfe in allen gängigen Schulfächern an: Mathematik, Naturwissenschaften (Physik, Chemie, Biologie), Deutsch, Englisch, Französisch und Spanisch."
      },
      {
        "question": "Wie läuft eine Probestunde ab?",
        "answer": "In der Probestunde lernen wir den Schüler kennen, ermitteln den aktuellen Wissensstand und erstellen einen individuellen Lernplan. Die Probestunde ist unverbindlich."
      },
      {
        "question": "Wo findet die Nachhilfe statt?",
        "answer": "Die Nachhilfe findet an unserem Standort in der Philipp-Bauer-Weg 2 in Mühlacker statt."
      },
      {
        "question": "Kann ich die Häufigkeit wechseln?",
        "answer": "Ja, selbstverständlich. Sie können jederzeit zwischen unseren Paketen (1x, 2x oder 3x pro Woche) wechseln. Sprechen Sie uns einfach an."
      }
    ]
  },
  "contact": {
    "sectionTitle": "Kontakt",
    "subtitle": "Haben Sie Fragen oder möchten Sie eine Probestunde vereinbaren? Schreiben Sie uns!",
    "form": {
      "name": "Name",
      "email": "E-Mail",
      "phone": "Telefon (optional)",
      "subject": "Fach / Klassenstufe (optional)",
      "message": "Ihre Nachricht",
      "submit": "Nachricht senden",
      "success": "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      "error": "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
    },
    "info": {
      "phone": "+49 174 388 96 92",
      "email": "info@bfm-muehlacker.de",
      "address": "Philipp-Bauer-Weg 2, Mühlacker"
    }
  },
  "footer": {
    "copyright": "© 2026 BFM — Bildung für Mühlacker. Alle Rechte vorbehalten.",
    "madeWith": "Mit ❤️ aus Mühlacker"
  },
  "impressum": {
    "title": "Impressum",
    "content": "Angaben gemäß § 5 TMG\n\nMehmet Futsi & Ali Bilen GbR\nBFM — Bildung für Mühlacker\nPhilipp-Bauer-Weg 2\n75417 Mühlacker\n\nKontakt:\nTelefon: +49 174 388 96 92\nE-Mail: info@bfm-muehlacker.de\n\nVerantwortlich für den Inhalt nach § 55 Abs. 2 RStV:\nMehmet Futsi & Ali Bilen\nPhilipp-Bauer-Weg 2\n75417 Mühlacker"
  },
  "datenschutz": {
    "title": "Datenschutzerklärung",
    "sections": [
      {
        "heading": "1. Verantwortlicher",
        "text": "Verantwortlicher für die Datenverarbeitung auf dieser Website ist:\n\nMehmet Futsi & Ali Bilen GbR\nPhilipp-Bauer-Weg 2\n75417 Mühlacker\nE-Mail: info@bfm-muehlacker.de"
      },
      {
        "heading": "2. Erhebung und Speicherung personenbezogener Daten",
        "text": "Beim Besuch unserer Website werden automatisch Informationen durch den Hosting-Anbieter (GitHub Pages) erfasst. Diese Daten (Server-Logfiles) umfassen den Browsertyp, das Betriebssystem, die Referrer-URL, den Hostname des zugreifenden Rechners und die Uhrzeit der Serveranfrage."
      },
      {
        "heading": "3. Kontaktformular",
        "text": "Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der dort angegebenen Kontaktdaten zur Bearbeitung der Anfrage bei uns gespeichert. Das Kontaktformular wird über den Dienst Formspree (formspree.io) verarbeitet. Formspree speichert Ihre Daten gemäß deren Datenschutzrichtlinie."
      },
      {
        "heading": "4. Google Maps",
        "text": "Diese Website nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited. Durch die Nutzung von Google Maps können Informationen über Ihre Benutzung dieser Website an Google übertragen werden."
      },
      {
        "heading": "5. Ihre Rechte",
        "text": "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Sie haben zudem das Recht, der Datenverarbeitung zu widersprechen und das Recht auf Datenübertragbarkeit. Zur Ausübung Ihrer Rechte kontaktieren Sie uns bitte unter info@bfm-muehlacker.de."
      }
    ]
  }
}
```

- [ ] **Step 4: Create Turkish translation file**

Create `src/messages/tr.json`:

```json
{
  "nav": {
    "about": "Hakkımızda",
    "services": "Hizmetler",
    "pricing": "Fiyatlar",
    "reviews": "Değerlendirmeler",
    "faq": "SSS",
    "contact": "İletişim",
    "impressum": "Künye",
    "datenschutz": "Gizlilik Politikası"
  },
  "hero": {
    "title": "Mühlacker'de Nitelikli Özel Ders",
    "subtitle": "Mühlacker'den destek — Mühlacker için! Öğrencilere okul başarılarında bireysel olarak eşlik ediyoruz.",
    "cta": "Hemen başvurun"
  },
  "about": {
    "sectionTitle": "Hakkımızda",
    "intro": "Biz Mehmet ve Ali — bir misyonu olan iki Mühlackerli genç: Öğrencilere mümkün olan en iyi desteği sunmak. 5 yılı aşkın deneyim ve 50'den fazla memnun öğrenciyle kalite için kişisel olarak garanti veriyoruz.",
    "mehmet": {
      "name": "Mehmet Futsi",
      "role": "Kurucu & Özel Ders Öğretmeni",
      "description": "Fen bilimleri ve matematik alanında uzmanlaşmıştır. Öğrencilere sadece bilgi değil, aynı zamanda özgüven kazandırmayı hedefleyen tutkulu bir eğitimci."
    },
    "ali": {
      "name": "Ali Bilen",
      "role": "Kurucu & Özel Ders Öğretmeni",
      "description": "Diller ve sosyal bilimler alanında uzman. Öğrencileri bireysel öğrenme stratejileri ve hedefli sınav hazırlığı ile destekler."
    }
  },
  "services": {
    "sectionTitle": "Hizmetlerimiz",
    "nachhilfe": {
      "title": "Özel Ders",
      "description": "Tüm derslerde bireysel özel ders — Matematik, Fen Bilimleri, Almanca, İngilizce, Fransızca ve İspanyolca. İlkokuldan abitura kadar.",
      "features": ["Tüm dersler", "İlkokuldan abitura kadar", "Bireysel destek"]
    },
    "pruefung": {
      "title": "Sınav Hazırlığı",
      "description": "Abitur, Realschule ve Hauptschule diplomaları için hedefli hazırlık. Birlikte bir çalışma planı oluşturuyor ve sınav konularını çalışıyoruz.",
      "features": ["Abitur", "Realschule diploması", "Hauptschule diploması"]
    },
    "bewerbung": {
      "title": "Başvuru Koçluğu",
      "description": "Başvurularda profesyonel destek — belgelerinizin hazırlanmasından iş görüşmelerine hazırlığa kadar.",
      "features": ["Başvuru belgeleri", "İş görüşmeleri", "Kariyer danışmanlığı"]
    }
  },
  "pricing": {
    "sectionTitle": "Fiyatlarımız",
    "subtitle": "Şeffaf ve adil — ne kadar sık, o kadar uygun.",
    "perMonth": "/ Ay",
    "from": "itibaren",
    "cta": "Hemen başvurun",
    "popular": "En popüler seçim",
    "plans": {
      "once": {
        "title": "Haftada 1 kez",
        "price": "95",
        "features": ["Haftada 1 ders", "Bireysel çalışma planı", "Tüm dersler mevcut"]
      },
      "twice": {
        "title": "Haftada 2 kez",
        "price": "165",
        "features": ["Haftada 2 ders", "Bireysel çalışma planı", "Tüm dersler mevcut", "Düzenli ilerleme raporları"]
      },
      "thrice": {
        "title": "Haftada 3 kez",
        "price": "220",
        "features": ["Haftada 3 ders", "Bireysel çalışma planı", "Tüm dersler mevcut", "Düzenli ilerleme raporları", "Ders başına en iyi fiyat"]
      }
    }
  },
  "reviews": {
    "sectionTitle": "Öğrencilerimiz ne diyor",
    "items": [
      {
        "name": "Veli görüşü",
        "text": "BFM sayesinde oğlum matematik notunu 5'ten 2'ye yükseltti. Bireysel destek mükemmel!",
        "rating": 5
      },
      {
        "name": "Öğrenci görüşü",
        "text": "Gerçekten zaman ayıran çok iyi öğretmenler. Artık okulda kendimi çok daha güvende hissediyorum.",
        "rating": 5
      },
      {
        "name": "Veli görüşü",
        "text": "Çok profesyonel ve güvenilir. Sınav hazırlığı kızıma çok yardımcı oldu. Kesinlikle tavsiye ederim!",
        "rating": 5
      }
    ]
  },
  "faq": {
    "sectionTitle": "Sıkça Sorulan Sorular",
    "items": [
      {
        "question": "Hangi dersleri sunuyorsunuz?",
        "answer": "Tüm yaygın okul derslerinde özel ders sunuyoruz: Matematik, Fen Bilimleri (Fizik, Kimya, Biyoloji), Almanca, İngilizce, Fransızca ve İspanyolca."
      },
      {
        "question": "Deneme dersi nasıl işliyor?",
        "answer": "Deneme dersinde öğrenciyi tanıyor, mevcut bilgi seviyesini belirliyoruz ve bireysel bir çalışma planı oluşturuyoruz. Deneme dersi bağlayıcı değildir."
      },
      {
        "question": "Özel ders nerede yapılıyor?",
        "answer": "Özel dersler Mühlacker'deki Philipp-Bauer-Weg 2 adresindeki merkezimizde yapılmaktadır."
      },
      {
        "question": "Sıklığı değiştirebilir miyim?",
        "answer": "Evet, elbette. Paketlerimiz (haftada 1, 2 veya 3 kez) arasında istediğiniz zaman geçiş yapabilirsiniz. Bize ulaşmanız yeterli."
      }
    ]
  },
  "contact": {
    "sectionTitle": "İletişim",
    "subtitle": "Sorularınız mı var veya deneme dersi ayarlamak mı istiyorsunuz? Bize yazın!",
    "form": {
      "name": "İsim",
      "email": "E-Posta",
      "phone": "Telefon (isteğe bağlı)",
      "subject": "Ders / Sınıf (isteğe bağlı)",
      "message": "Mesajınız",
      "submit": "Mesaj gönder",
      "success": "Teşekkürler! 24 saat içinde size geri döneceğiz.",
      "error": "Bir şeyler ters gitti. Lütfen tekrar deneyin."
    },
    "info": {
      "phone": "+49 174 388 96 92",
      "email": "info@bfm-muehlacker.de",
      "address": "Philipp-Bauer-Weg 2, Mühlacker"
    }
  },
  "footer": {
    "copyright": "© 2026 BFM — Bildung für Mühlacker. Tüm hakları saklıdır.",
    "madeWith": "Mühlacker'den ❤️ ile yapıldı"
  },
  "impressum": {
    "title": "Künye",
    "content": "§ 5 TMG gereğince bilgiler\n\nMehmet Futsi & Ali Bilen GbR\nBFM — Bildung für Mühlacker\nPhilipp-Bauer-Weg 2\n75417 Mühlacker\n\nİletişim:\nTelefon: +49 174 388 96 92\nE-Posta: info@bfm-muehlacker.de\n\n§ 55 Abs. 2 RStV gereğince içerikten sorumlu:\nMehmet Futsi & Ali Bilen\nPhilipp-Bauer-Weg 2\n75417 Mühlacker"
  },
  "datenschutz": {
    "title": "Gizlilik Politikası",
    "sections": [
      {
        "heading": "1. Sorumlu",
        "text": "Bu web sitesindeki veri işlemeden sorumlu olan:\n\nMehmet Futsi & Ali Bilen GbR\nPhilipp-Bauer-Weg 2\n75417 Mühlacker\nE-Posta: info@bfm-muehlacker.de"
      },
      {
        "heading": "2. Kişisel verilerin toplanması ve saklanması",
        "text": "Web sitemizi ziyaret ettiğinizde, barındırma sağlayıcısı (GitHub Pages) tarafından otomatik olarak bilgiler kaydedilir. Bu veriler (sunucu günlük dosyaları) tarayıcı türü, işletim sistemi, yönlendiren URL, erişen bilgisayarın ana bilgisayar adı ve sunucu isteğinin zamanını içerir."
      },
      {
        "heading": "3. İletişim formu",
        "text": "Bize iletişim formu aracılığıyla sorular gönderdiğinizde, formda belirttiğiniz iletişim verileri dahil olmak üzere bilgileriniz talebin işlenmesi için tarafımızda saklanır. İletişim formu Formspree (formspree.io) hizmeti aracılığıyla işlenir."
      },
      {
        "heading": "4. Google Maps",
        "text": "Bu web sitesi Google Maps harita hizmetini kullanmaktadır. Sağlayıcı Google Ireland Limited'dir. Google Maps kullanımı yoluyla, bu web sitesini kullanımınız hakkında bilgiler Google'a iletilebilir."
      },
      {
        "heading": "5. Haklarınız",
        "text": "Kişisel verilerinizin bilgilendirilmesi, düzeltilmesi, silinmesi ve işlenmesinin kısıtlanması hakkına sahipsiniz. Ayrıca veri işlemeye itiraz etme ve veri taşınabilirliği hakkına sahipsiniz. Haklarınızı kullanmak için lütfen info@bfm-muehlacker.de adresinden bize ulaşın."
      }
    ]
  }
}
```

- [ ] **Step 5: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "tr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-white text-gray-800 antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder homepage**

Create `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("hero");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </main>
  );
}
```

- [ ] **Step 7: Delete the default page.tsx if it exists**

```bash
rm -f src/app/page.tsx
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```

Expected: Build succeeds, static pages generated for `/de/` and `/tr/`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add i18n setup with German and Turkish translations"
```

---

### Task 3: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "#about", key: "about" },
  { href: "#services", key: "services" },
  { href: "#pricing", key: "pricing" },
  { href: "#reviews", key: "reviews" },
  { href: "#faq", key: "faq" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "de" ? "tr" : "de";
  const localePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={`/${locale}/`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">BFM</span>
            <span className="hidden sm:inline text-sm text-gray-500">
              Bildung für Mühlacker
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Language switcher + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={localePath || `/${otherLocale}/`}
              className="px-3 py-1 text-sm font-medium rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {otherLocale.toUpperCase()}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600"
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {t(link.key)}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Add Navbar to locale layout**

Update `src/app/[locale]/layout.tsx` — add Navbar import and render it above `{children}`:

```tsx
import Navbar from "@/components/Navbar";
```

In the body, add Navbar:

```tsx
<body className="bg-white text-gray-800 antialiased">
  <NextIntlClientProvider messages={messages}>
    <Navbar />
    <main className="pt-16">{children}</main>
  </NextIntlClientProvider>
</body>
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open `http://localhost:3000/de/` — navbar should display with German labels, language switcher to TR.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add responsive navbar with language switcher"
```

---

### Task 4: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-accent overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          {t("cta")}
        </a>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-white/60">Schüler</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">5+</div>
            <div className="text-sm text-white/60">Jahre</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-sm text-white/60">Zufriedenheit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update homepage to use Hero**

Replace `src/app/[locale]/page.tsx` with:

```tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000/de/` — hero section with gradient, headline, CTA and stats visible.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hero section with gradient and stats"
```

---

### Task 5: About Us Section

**Files:**
- Create: `src/components/AboutUs.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create AboutUs component**

Create `src/components/AboutUs.tsx`:

```tsx
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutUs() {
  const t = useTranslations("about");

  const team = [
    {
      key: "mehmet",
      image: "/images/mehmet.jpg",
    },
    {
      key: "ali",
      image: "/images/ali.jpg",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          {t("intro")}
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member) => (
            <div
              key={member.key}
              className="text-center group"
            >
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent/20 shadow-lg group-hover:border-accent transition-colors duration-300">
                <Image
                  src={member.image}
                  alt={t(`${member.key}.name`)}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-primary">
                {t(`${member.key}.name`)}
              </h3>
              <p className="text-accent font-medium mb-3">
                {t(`${member.key}.role`)}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t(`${member.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add placeholder images**

```bash
mkdir -p public/images
```

Create placeholder images (will be replaced by real photos later):

```bash
# Create simple SVG placeholders
cat > public/images/mehmet.jpg << 'SVG'
placeholder
SVG
cat > public/images/ali.jpg << 'SVG'
placeholder
SVG
```

Note: These will be replaced with real photos from the `/Bilder` folder.

- [ ] **Step 3: Add AboutUs to homepage**

In `src/app/[locale]/page.tsx`, add:

```tsx
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser and commit**

```bash
npm run dev
```

Check `http://localhost:3000/de/` — about section with two team members visible.

```bash
git add -A
git commit -m "feat: add about us section with team profiles"
```

---

### Task 6: Services Section

**Files:**
- Create: `src/components/Services.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Services component**

Create `src/components/Services.tsx`:

```tsx
import { useTranslations } from "next-intl";

const serviceIcons = {
  nachhilfe: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  pruefung: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  bewerbung: (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function Services() {
  const t = useTranslations("services");

  const services = ["nachhilfe", "pruefung", "bewerbung"] as const;

  return (
    <section id="services" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-16">
          {t("sectionTitle")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                {serviceIcons[service]}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {t(`${service}.title`)}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t(`${service}.description`)}
              </p>
              <ul className="space-y-2">
                {(t.raw(`${service}.features`) as string[]).map(
                  (feature: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-accent flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Services to homepage**

In `src/app/[locale]/page.tsx`, add import and component:

```tsx
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Services />
    </>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npm run dev
```

```bash
git add -A
git commit -m "feat: add services section with cards and icons"
```

---

### Task 7: Pricing Section

**Files:**
- Create: `src/components/Pricing.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Pricing component**

Create `src/components/Pricing.tsx`:

```tsx
import { useTranslations } from "next-intl";

const plans = ["once", "twice", "thrice"] as const;

export default function Pricing() {
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-center text-gray-600 mb-16">{t("subtitle")}</p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const isPopular = plan === "thrice";
            return (
              <div
                key={plan}
                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${
                  isPopular
                    ? "border-accent bg-accent/5 shadow-xl scale-105"
                    : "border-gray-200 bg-white hover:border-accent/50 hover:shadow-lg"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm font-bold rounded-full">
                    {t("popular")}
                  </div>
                )}
                <h3 className="text-lg font-bold text-primary mb-2">
                  {t(`plans.${plan}.title`)}
                </h3>
                <div className="mb-6">
                  <span className="text-sm text-gray-500">{t("from")} </span>
                  <span className="text-4xl font-extrabold text-primary">
                    {t(`plans.${plan}.price`)}€
                  </span>
                  <span className="text-gray-500"> {t("perMonth")}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {(t.raw(`plans.${plan}.features`) as string[]).map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <svg
                          className="w-5 h-5 text-accent flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <a
                  href="#contact"
                  className={`block w-full text-center py-3 rounded-full font-bold transition-all duration-300 ${
                    isPopular
                      ? "bg-accent text-white hover:bg-accent-dark shadow-md"
                      : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {t("cta")}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Pricing to homepage**

In `src/app/[locale]/page.tsx`, add import and component after Services:

```tsx
import Pricing from "@/components/Pricing";
```

Add `<Pricing />` after `<Services />`.

- [ ] **Step 3: Verify and commit**

```bash
git add -A
git commit -m "feat: add pricing section with tier cards"
```

---

### Task 8: Reviews Section

**Files:**
- Create: `src/components/Reviews.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Reviews component**

Create `src/components/Reviews.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Array<{
    name: string;
    text: string;
    rating: number;
  }>;

  return (
    <section id="reviews" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-16">
          {t("sectionTitle")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <svg
                    key={j}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="font-bold text-primary">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage and commit**

Add `<Reviews />` after `<Pricing />` in `src/app/[locale]/page.tsx`.

```bash
git add -A
git commit -m "feat: add reviews section with star ratings"
```

---

### Task 9: FAQ Section

**Files:**
- Create: `src/components/FAQ.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create FAQ component**

Create `src/components/FAQ.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as Array<{
    question: string;
    answer: string;
  }>;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-16">
          {t("sectionTitle")}
        </h2>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface transition-colors"
              >
                <span className="font-medium text-primary">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${
                    open === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {open === i && (
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to homepage and commit**

Add `<FAQ />` after `<Reviews />` in `src/app/[locale]/page.tsx`.

```bash
git add -A
git commit -m "feat: add FAQ section with accordion"
```

---

### Task 10: Contact Section with Formspree

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create Contact component**

Create `src/components/Contact.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";

export default function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      setError(true);
    }
  }

  return (
    <section id="contact" className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-center text-gray-600 mb-16">{t("subtitle")}</p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-800">
                  {t("form.success")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.name")} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.email")} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.subject")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("form.message")} *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">{t("form.error")}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-white font-bold rounded-full hover:bg-accent-dark transition-colors shadow-md hover:shadow-lg"
                >
                  {t("form.submit")}
                </button>
              </form>
            )}
          </div>

          {/* Info + Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+4917438896 92" className="text-gray-700 hover:text-accent">
                    {t("info.phone")}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@bfm-muehlacker.de" className="text-gray-700 hover:text-accent">
                    {t("info.email")}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">{t("info.address")}</span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d8.839!3d48.946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPhilipp-Bauer-Weg+2%2C+75417+M%C3%BChlacker!5e0!3m2!1sde!2sde!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BFM Standort"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Note:** Replace `YOUR_FORM_ID` with the actual Formspree form ID once created at formspree.io.

- [ ] **Step 2: Add to homepage and commit**

Add `<Contact />` after `<FAQ />` in `src/app/[locale]/page.tsx`.

```bash
git add -A
git commit -m "feat: add contact section with Formspree form and Google Maps"
```

---

### Task 11: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/Footer.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">BFM</h3>
            <p className="text-white/60 text-sm">
              Bildung für Mühlacker
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-3">Links</h4>
            <div className="space-y-2 text-sm">
              <a
                href={`/${locale}/impressum/`}
                className="block text-white/60 hover:text-white transition-colors"
              >
                {nav("impressum")}
              </a>
              <a
                href={`/${locale}/datenschutz/`}
                className="block text-white/60 hover:text-white transition-colors"
              >
                {nav("datenschutz")}
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-3">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/bfm_muehlacker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/bfmmuehlacker"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>{t("copyright")}</p>
          <p>{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to locale layout**

In `src/app/[locale]/layout.tsx`, import Footer and add after `</main>`:

```tsx
import Footer from "@/components/Footer";
```

```tsx
<main className="pt-16">{children}</main>
<Footer />
```

- [ ] **Step 3: Verify and commit**

```bash
git add -A
git commit -m "feat: add footer with social links and legal pages"
```

---

### Task 12: Impressum & Datenschutz Pages

**Files:**
- Create: `src/app/[locale]/impressum/page.tsx`, `src/app/[locale]/datenschutz/page.tsx`

- [ ] **Step 1: Create Impressum page**

Create `src/app/[locale]/impressum/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Impressum() {
  const t = useTranslations("impressum");

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">{t("title")}</h1>
        <div className="prose prose-gray max-w-none whitespace-pre-line text-gray-700 leading-relaxed">
          {t("content")}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Datenschutz page**

Create `src/app/[locale]/datenschutz/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Datenschutz() {
  const t = useTranslations("datenschutz");
  const sections = t.raw("sections") as Array<{
    heading: string;
    text: string;
  }>;

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">{t("title")}</h1>
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold text-primary mb-3">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npm run build
```

Expected: `/de/impressum/`, `/de/datenschutz/`, `/tr/impressum/`, `/tr/datenschutz/` all generated.

```bash
git add -A
git commit -m "feat: add impressum and datenschutz pages"
```

---

### Task 13: SEO — Meta Tags & JSON-LD

**Files:**
- Modify: `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

- [ ] **Step 1: Add metadata to locale layout**

In `src/app/[locale]/layout.tsx`, add metadata generation:

```tsx
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";

  return {
    title: {
      default: isDE
        ? "BFM — Qualifizierte Nachhilfe in Mühlacker"
        : "BFM — Mühlacker'de Nitelikli Özel Ders",
      template: "%s | BFM Mühlacker",
    },
    description: isDE
      ? "Individuelle Nachhilfe in Mühlacker. Alle Fächer, Prüfungsvorbereitung und Bewerbungscoaching. Über 50 zufriedene Schüler."
      : "Mühlacker'de bireysel özel ders. Tüm dersler, sınav hazırlığı ve başvuru koçluğu.",
    openGraph: {
      title: "BFM — Bildung für Mühlacker",
      description: isDE
        ? "Ihre erste Wahl für qualifizierte Nachhilfe in Mühlacker"
        : "Mühlacker'de nitelikli özel ders için ilk tercihiniz",
      url: "https://bfm-muehlacker.de",
      siteName: "BFM Mühlacker",
      locale: isDE ? "de_DE" : "tr_TR",
      type: "website",
    },
  };
}
```

- [ ] **Step 2: Add JSON-LD structured data to homepage**

In `src/app/[locale]/page.tsx`, add a JSON-LD script before the components:

```tsx
import Script from "next/script";

// Add inside the component, before the first section:
<Script
  id="json-ld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "BFM — Bildung für Mühlacker",
      description: "Qualifizierte Nachhilfe in Mühlacker",
      url: "https://bfm-muehlacker.de",
      telephone: "+4917438896 92",
      email: "info@bfm-muehlacker.de",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Philipp-Bauer-Weg 2",
        addressLocality: "Mühlacker",
        postalCode: "75417",
        addressCountry: "DE",
      },
      areaServed: "Mühlacker",
      founder: ["Mehmet Futsi", "Ali Bilen"],
    }),
  }}
/>
```

- [ ] **Step 3: Verify build and commit**

```bash
npm run build
git add -A
git commit -m "feat: add SEO meta tags and JSON-LD structured data"
```

---

### Task 14: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`, `.nojekyll`

- [ ] **Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Create .nojekyll file**

```bash
touch public/.nojekyll
```

- [ ] **Step 3: Create redirect from root to /de/**

Create `public/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="refresh" content="0; url=/de/" />
    <link rel="canonical" href="/de/" />
  </head>
  <body>
    <p>Redirecting to <a href="/de/">BFM — Bildung für Mühlacker</a></p>
  </body>
</html>
```

- [ ] **Step 4: Final build verification**

```bash
npm run build
```

Expected: `out/` directory contains all static files — `/de/index.html`, `/tr/index.html`, `/de/impressum/index.html`, etc.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add GitHub Pages deployment workflow and root redirect"
```

- [ ] **Step 6: Create GitHub repository and push**

```bash
gh repo create bfm-muehlacker --public --source=. --push
```

After push, enable GitHub Pages in repo settings:
- Go to Settings → Pages → Source: GitHub Actions

---

## Post-Deployment Checklist

- [ ] Replace `YOUR_FORM_ID` in `Contact.tsx` with actual Formspree form ID
- [ ] Replace placeholder team photos with real photos from `/Bilder`
- [ ] Update Google Reviews with real customer reviews
- [ ] Verify social media URLs (Instagram, Facebook) are correct
- [ ] Update Google Maps embed URL with exact coordinates
- [ ] Configure custom domain `bfm-muehlacker.de` in GitHub Pages settings
- [ ] Update DNS at IONOS to point to GitHub Pages
- [ ] Create Formspree account and form at formspree.io
- [ ] Test contact form end-to-end
- [ ] Run Lighthouse audit and fix any issues
