# WIX Integration Guide - Mastermind Dubai Landing Page

## Übersicht

Diese Anleitung erklärt, wie Sie die React-Landing-Page in Ihre bestehende WIX-Website integrieren können.

## Integrationsmöglichkeiten

### Option 1: Subdomain (Empfohlen - Beste Performance)

**Vorteile:**
- ✅ Beste Performance und Ladezeiten
- ✅ Volle Kontrolle über die Landing Page
- ✅ Keine Einschränkungen durch WIX
- ✅ Einfache Wartung und Updates

**Setup:**
1. Deployen Sie die Landing Page auf einem Hosting-Service (Vercel, Netlify, etc.)
2. Verbinden Sie eine Subdomain (z.B. `mastermind.chrissteiner.at`)
3. Verlinken Sie von der Haupt-WIX-Seite zur Subdomain

**Details siehe unten: "Deployment auf Vercel/Netlify"**

---

### Option 2: iFrame Embedding (Mittel)

**Vorteile:**
- ✅ Alles unter einer Domain
- ✅ Relativ einfach zu implementieren
- ⚠️ Kann Performance-Probleme verursachen
- ⚠️ SEO-Nachteile möglich

**WIX Setup:**

1. **Landing Page deployen** (siehe Deployment-Sektion)

2. **WIX-Seite erstellen:**
   - Gehen Sie zu WIX Dashboard
   - Erstellen Sie eine neue Seite: "Mastermind Dubai"
   - Setzen Sie Layout auf "Blank" (leer)

3. **iFrame hinzufügen:**
   - Klicken Sie auf **"Add Elements"** → **"Embed"** → **"Custom Embeds"** → **"Embed a site"**
   - Fügen Sie Ihre deployed URL ein (z.B. `https://mastermind-dubai.vercel.app`)
   - Setzen Sie iFrame auf Vollbild:
     - Breite: 100%
     - Höhe: 100vh (Viewport-Höhe)
     - Entfernen Sie alle Margins/Paddings

4. **Code-Snippet für bessere Integration:**
   ```html
   <iframe
     src="https://your-deployed-url.vercel.app"
     width="100%"
     height="100%"
     frameborder="0"
     style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; border: none;"
     allow="autoplay; fullscreen"
   ></iframe>
   ```

**CSS in WIX hinzufügen:**
```css
/* Entfernen Sie WIX-Header/Footer auf dieser Seite */
body {
  overflow: hidden;
}

#SITE_HEADER,
#SITE_FOOTER {
  display: none !important;
}
```

---

### Option 3: Custom HTML Element (Eingeschränkt)

**Nur für kleine Teile geeignet**, nicht für die komplette Landing Page.

---

## Deployment (für Option 1 & 2)

### Deployment auf Vercel (Empfohlen)

**Schritt 1: Vercel Account**
1. Gehen Sie zu [vercel.com](https://vercel.com)
2. Registrieren Sie sich (kostenlos mit GitHub)

**Schritt 2: GitHub Repository erstellen**
```bash
cd "/Users/danylogevel/Documents/Coding/Mastermind Dubai Website"

# Git initialisieren (falls noch nicht geschehen)
git init
git add .
git commit -m "Initial commit - Mastermind Dubai Landing Page"

# Repository erstellen auf GitHub und pushen
# (GitHub Desktop oder gh CLI verwenden)
```

**Schritt 3: Vercel Deployment**
1. Gehen Sie zu [vercel.com/new](https://vercel.com/new)
2. Wählen Sie Ihr GitHub Repository
3. Framework: **Vite** (wird automatisch erkannt)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Klicken Sie auf **"Deploy"**

**Schritt 4: Custom Domain (Optional)**
1. Nach Deployment → **"Settings"** → **"Domains"**
2. Fügen Sie Ihre Domain hinzu (z.B. `mastermind.chrissteiner.at`)
3. Folgen Sie den DNS-Anweisungen

**Ihre Seite ist nun live! 🎉**

---

### Alternative: Deployment auf Netlify

**Schritt 1: Netlify Account**
1. Gehen Sie zu [netlify.com](https://netlify.com)
2. Registrieren Sie sich

**Schritt 2: Drag & Drop Deployment**
```bash
# Bauen Sie die Seite lokal
npm run build

# Ordner 'dist' wird erstellt
```

3. Gehen Sie zu Netlify Dashboard
4. Drag & Drop den `dist` Ordner
5. Seite ist live!

**Oder mit GitHub:**
1. Verbinden Sie Ihr GitHub Repository
2. Build Settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy!

---

## Domain-Konfiguration

### Subdomain für Landing Page einrichten

**Beispiel: `mastermind.chrissteiner.at`**

1. **Bei Ihrem DNS-Provider (z.B. Cloudflare):**
   - Typ: `CNAME`
   - Name: `mastermind`
   - Ziel: `cname.vercel-dns.com` (oder Netlify-Äquivalent)
   - TTL: Auto

2. **Bei Vercel/Netlify:**
   - Gehen Sie zu Domain-Settings
   - Fügen Sie `mastermind.chrissteiner.at` hinzu
   - Warten Sie auf DNS-Propagierung (bis zu 48h)

3. **Von WIX-Seite verlinken:**
   - Button oder Link erstellen
   - URL: `https://mastermind.chrissteiner.at`
   - Link öffnet sich in neuem Tab (empfohlen) oder gleichem Tab

---

## Verknüpfung mit Haupt-WIX-Seite

### Navigation von WIX zu Landing Page

**1. Haupt-CTA auf WIX Homepage:**
```html
<!-- Beispiel Button-Code -->
<a href="https://mastermind.chrissteiner.at"
   class="cta-button"
   target="_blank"
   rel="noopener noreferrer">
  Zum Mastermind Dubai →
</a>
```

**2. Menü-Link hinzufügen:**
- WIX Editor → "Menu"
- Neuer Link: "Mastermind Dubai"
- URL: `https://mastermind.chrissteiner.at`

**3. Footer-Link:**
- Fügen Sie Link im Footer hinzu
- Text: "Exklusives Mastermind in Dubai"

### Navigation von Landing Page zu WIX

Bereits implementiert im Footer-Component:
```tsx
<a
  href="https://www.chrissteiner.at"
  target="_blank"
  rel="noopener noreferrer"
>
  Chris Steiner Website
</a>
```

---

## SEO & Analytics

### Google Analytics Integration

**In beiden Seiten (WIX + Landing Page):**

1. **Landing Page** - Fügen Sie in `index.html` ein:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. **WIX** - Über WIX Dashboard:
   - Settings → Tracking & Analytics
   - Fügen Sie Google Analytics ID hinzu

### SEO Meta-Tags (bereits implementiert)

```html
<meta name="description" content="Exklusives Mastermind mit Chris Steiner in Dubai - Rixos Premium Hotel. Jetzt bewerben für limitierte Plätze." />
<title>Mastermind Dubai - Chris Steiner | Exklusive Business Masterclass</title>
```

**Zusätzliche Meta-Tags (Optional):**
```html
<!-- Open Graph für Social Media -->
<meta property="og:title" content="Mastermind Dubai - Chris Steiner" />
<meta property="og:description" content="Exklusives Mastermind in Dubai" />
<meta property="og:image" content="https://your-url/og-image.jpg" />
<meta property="og:url" content="https://mastermind.chrissteiner.at" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Mastermind Dubai - Chris Steiner" />
```

---

## Form Submission Integration

### Aktueller Status
Die Bewerbungsformular sendet Daten aktuell nur in die Browser-Console.

### Integration mit Backend

**Option A: WIX Forms/Database**
```typescript
// In src/components/ApplicationForm.tsx

const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('https://www.chrissteiner.at/_functions/submitApplication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setIsSubmitted(true);
      // Optional: Redirect to thank you page
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
};
```

**Option B: Email-Service (z.B. SendGrid, EmailJS)**
```typescript
import emailjs from '@emailjs/browser';

const onSubmit = async (data: FormData) => {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        phone: data.phone,
        company: data.company,
        position: data.position,
        motivation: data.motivation,
      },
      'YOUR_PUBLIC_KEY'
    );
    setIsSubmitted(true);
  } catch (error) {
    console.error('Email error:', error);
  }
};
```

**Option C: Zapier/Make.com (No-Code)**
1. Erstellen Sie einen Webhook in Zapier
2. Verbinden Sie mit Google Sheets/Email/CRM
3. Verwenden Sie Webhook-URL im Form-Submit

---

## Performance-Optimierung

### Build-Optimierung

```bash
# Produktions-Build erstellen
npm run build

# Analyse der Bundle-Größe
npm run build -- --mode=analyze
```

### Lazy Loading für Videos

Videos werden bereits optimiert geladen:
- `loading="lazy"` für Bilder
- Videos mit `autoPlay` und `muted` für Hero
- Aftermovie lädt nur bei Bedarf

### Caching-Strategie

**Vercel/Netlify konfigurieren automatisch:**
- HTML: No-Cache
- JS/CSS: Langzeit-Cache
- Medien: Langzeit-Cache

---

## Troubleshooting

### Problem: iFrame scrollt nicht richtig
**Lösung:**
```css
/* In WIX Custom CSS */
iframe {
  min-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
```

### Problem: Videos laden nicht in iFrame
**Lösung:**
- Verwenden Sie Cloudflare R2 (siehe CLOUDFLARE-R2-SETUP.md)
- Fügen Sie `allow="autoplay"` zum iFrame hinzu

### Problem: Mobile-Ansicht ist abgeschnitten
**Lösung:**
```html
<!-- Viewport in Landing Page index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```

### Problem: WIX-Header/Footer erscheinen im iFrame
**Lösung:**
- Erstellen Sie eine leere WIX-Seite ohne Header/Footer
- Oder verwenden Sie Subdomain-Approach (Option 1)

---

## Kosten-Übersicht

### Vercel (Hobby Plan - Kostenlos)
- ✅ Unbegrenzte Deployments
- ✅ 100 GB Bandwidth/Monat
- ✅ Automatische SSL
- ✅ Custom Domain
- ⚠️ Kommerzielle Nutzung: Pro Plan ($20/Monat)

### Netlify (Free Plan)
- ✅ 100 GB Bandwidth/Monat
- ✅ 300 Build-Minuten/Monat
- ✅ Automatische SSL
- ✅ Custom Domain

### Cloudflare R2 (siehe CLOUDFLARE-R2-SETUP.md)
- ✅ Erste 10 GB Speicher kostenlos
- ✅ Kein Egress-Traffic (immer kostenlos)

**Gesamtkosten für kleine bis mittlere Traffic:**
- **€0/Monat** (mit kostenlosen Plans)
- Bei hohem Traffic: ~€20-30/Monat

---

## Testing

### Vor dem Live-Gang

1. ✅ Testen Sie alle Links (intern & extern)
2. ✅ Testen Sie das Formular
3. ✅ Testen Sie auf verschiedenen Geräten:
   - iPhone (Safari)
   - Android (Chrome)
   - Desktop (Chrome, Firefox, Safari)
4. ✅ Testen Sie Video-Playback
5. ✅ Testen Sie Gallery-Lightbox
6. ✅ Prüfen Sie Ladezeiten mit [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Support & Wartung

### Updates durchführen

```bash
# Code ändern
git add .
git commit -m "Update: Beschreibung"
git push

# Vercel/Netlify deployt automatisch!
```

### Monitoring

- **Vercel Analytics**: Automatisch verfügbar
- **Google Analytics**: Nach Setup (siehe oben)
- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com) (kostenlos)

---

## Zusammenfassung

**Empfohlener Workflow:**

1. ✅ **Deploy auf Vercel** (beste Performance)
2. ✅ **Subdomain einrichten** (`mastermind.chrissteiner.at`)
3. ✅ **Videos auf Cloudflare R2** hosten
4. ✅ **Von WIX verlinken** (Button/Menü)
5. ✅ **Form-Backend** integrieren (Email oder WIX)
6. ✅ **Analytics** einrichten
7. ✅ **Testing** auf allen Geräten
8. ✅ **Go Live!** 🚀

Bei Fragen oder Problemen:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- WIX Support: https://support.wix.com
