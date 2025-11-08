# Mastermind Dubai Landing Page

Eine exklusive, mobile-first Landing Page für das Chris Steiner Mastermind Event in Dubai.

![Mastermind Dubai](public/media/title.jpg)

## 🎯 Über das Projekt

Premium Landing Page für die Registration zum exklusiven Mastermind-Event mit Chris Steiner im Rixos Premium Hotel, Dubai. Die Website ist komplett in Deutsch und optimiert für mobile Geräte.

## ✨ Features

- 🎬 **Video Hero Section** mit Loop-Video und title.jpg Overlay
- 📱 **Mobile-First Design** - optimiert für alle Geräte
- 🎨 **Dubai-Premium Theme** - Aquamarin, Gold & Parchment Farben
- 🖼️ **Memories Gallery** mit Lightbox-Funktion (9 Fotos)
- 📝 **Bewerbungsformular** mit React Hook Form & Zod Validation
- 🎥 **Aftermovie Section** mit Video-Player
- ✨ **Framer Motion Animationen** - Scroll-Reveals & Transitions
- 🚀 **Performance-optimiert** - Lazy Loading & Code Splitting

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS mit Custom Theme
- **UI Components**: shadcn/ui Basis
- **Animations**: Framer Motion
- **Form Validation**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build erstellen
npm run build

# Production Build lokal testen
npm run preview
```

## 🎨 Farbschema

Das Dubai-Premium Theme verwendet:

- **Aquamarine**: `#00CED1` - `#40E0D0` (Luxury, Water)
- **Gold**: `#D4AF37` - `#FFD700` (Premium, Elegance)
- **Parchment**: `#F5E6D3` - `#E8DCC4` (Warm, Sophisticated)

Alle Farben sind in `tailwind.config.js` definiert und können einfach angepasst werden.

## 📁 Projektstruktur

```
├── public/
│   └── media/              # Alle Medien-Dateien
│       ├── title.jpg       # Hero Title Image
│       ├── Loop Mastermind.mp4         # Hero Background Video
│       ├── Mastermind Aftermovie final.mp4
│       └── *.png/jpg       # Gallery Fotos
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Hero Section mit Video
│   │   ├── EventDetails.tsx      # Event-Info & Chris Steiner
│   │   ├── MemoriesGallery.tsx   # Foto-Galerie
│   │   ├── ApplicationForm.tsx   # Bewerbungsformular
│   │   ├── Aftermovie.tsx        # Aftermovie Player
│   │   └── Footer.tsx            # Footer mit Links
│   ├── lib/
│   │   └── utils.ts              # Utility Functions
│   ├── App.tsx                    # Main App Component
│   ├── index.css                  # Tailwind + Custom Styles
│   └── main.tsx                   # Entry Point
├── CLOUDFLARE-R2-SETUP.md    # R2 Setup Guide
├── WIX-INTEGRATION-GUIDE.md  # WIX Integration Guide
└── README.md
```

## 🎬 Video Setup

### Lokale Entwicklung
Videos sind aktuell im `public/media/` Ordner und werden lokal geladen.

### Produktion (Empfohlen: Cloudflare R2)
Für bessere Performance sollten die großen Video-Dateien auf Cloudflare R2 gehostet werden:

1. Folgen Sie der Anleitung in **[CLOUDFLARE-R2-SETUP.md](CLOUDFLARE-R2-SETUP.md)**
2. Aktualisieren Sie die Video-URLs in:
   - `src/components/Hero.tsx` (Line 18)
   - `src/components/Aftermovie.tsx` (Line 47)

**Video-Größen:**
- Loop Mastermind.mp4: ~80 MB
- Mastermind Aftermovie final.mp4: ~580 MB

## 📋 Formular-Integration

Das Bewerbungsformular ist aktuell frontend-only. Für die Produktion müssen Sie ein Backend integrieren:

### Option 1: Email Service (EmailJS)
```bash
npm install @emailjs/browser
```

Siehe `src/components/ApplicationForm.tsx` Kommentare für Integration.

### Option 2: WIX Backend
Siehe **[WIX-INTEGRATION-GUIDE.md](WIX-INTEGRATION-GUIDE.md)** für Details.

### Option 3: Custom API
```typescript
const onSubmit = async (data: FormData) => {
  await fetch('/api/application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};
```

## 🌐 WIX Integration

Diese Landing Page kann in Ihre bestehende WIX-Website integriert werden:

**Siehe komplette Anleitung:** **[WIX-INTEGRATION-GUIDE.md](WIX-INTEGRATION-GUIDE.md)**

### Quick Start:
1. Deploy auf Vercel/Netlify
2. Subdomain einrichten (z.B. `mastermind.chrissteiner.at`)
3. Von WIX-Seite verlinken

## 🚀 Deployment

### Vercel (Empfohlen)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Git Repository erstellen
git init
git add .
git commit -m "Initial commit"

# Auf Vercel deployen (via GitHub)
# Automatisch nach Push zu main branch
```

**Build Settings:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Netlify

```bash
# Build lokal
npm run build

# Drag & Drop 'dist' Ordner auf Netlify
```

## 🎯 Performance

Die Website ist für beste Performance optimiert:

- ✅ Lazy Loading für Bilder
- ✅ Code Splitting
- ✅ Optimierte Fonts (Google Fonts)
- ✅ Responsive Images
- ✅ Minimiertes CSS/JS

**Lighthouse Score Ziele:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## 🔧 Anpassungen

### Inhalte ändern

Alle deutschen Texte befinden sich direkt in den Komponenten:
- Hero: `src/components/Hero.tsx`
- Event Details: `src/components/EventDetails.tsx`
- Footer: `src/components/Footer.tsx`

### Farben anpassen

Farben in `tailwind.config.js` ändern:
```javascript
colors: {
  aquamarine: { /* ... */ },
  gold: { /* ... */ },
  parchment: { /* ... */ },
}
```

### Kontaktdaten

Footer-Komponente: `src/components/Footer.tsx`
- Email: Line 48
- Telefon: Line 58
- Adresse: Line 68

## 📱 Browser Support

- Chrome (aktuell & -2)
- Firefox (aktuell & -2)
- Safari (aktuell & -2)
- Edge (aktuell & -2)
- iOS Safari 13+
- Chrome Android

## 🐛 Troubleshooting

### Videos laden nicht
- Prüfen Sie, ob Dateien in `public/media/` existieren
- Browser-Console auf Fehler prüfen
- Siehe CLOUDFLARE-R2-SETUP.md für Production

### Formular funktioniert nicht
- Backend-Integration erforderlich (siehe oben)
- Aktuell nur Console-Output

### Styles werden nicht angewendet
```bash
# Tailwind neu kompilieren
npm run dev
```

### Build-Fehler
```bash
# Dependencies neu installieren
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

- **Chris Steiner Website**: [chrissteiner.at](https://www.chrissteiner.at)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **React Docs**: [react.dev](https://react.dev)
- **Tailwind Docs**: [tailwindcss.com](https://tailwindcss.com)

## 📄 Lizenz

Privates Projekt für Chris Steiner Mastermind Event.

---

**Entwickelt mit ❤️ für exklusive Business-Events in Dubai**

🌐 **Live**: `https://mastermind.chrissteiner.at` (nach Deployment)

📧 **Kontakt**: info@chrissteiner.at
