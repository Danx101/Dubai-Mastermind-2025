# Cloudflare R2 Setup für Mastermind Dubai Website

## Warum Cloudflare R2?

Cloudflare R2 ist ideal für die Video-Hosting-Anforderungen dieser Website:

- **Kosteneffizient**: Keine Egress-Gebühren (Ausgangsverkehr ist kostenlos)
- **Schnelle globale Auslieferung**: Über Cloudflare's CDN-Netzwerk
- **Große Dateien**: Perfekt für die beiden Videos (80MB + 580MB)
- **Hohe Performance**: Niedrige Latenz weltweit

## Schritt-für-Schritt Anleitung

### 1. Cloudflare Account einrichten

1. Gehen Sie zu [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Registrieren Sie sich oder melden Sie sich an
3. Navigieren Sie zu **R2** im Seitenmenü

### 2. R2 Bucket erstellen

1. Klicken Sie auf **"Create bucket"**
2. Bucket-Name: `mastermind-dubai-media` (oder einen eigenen Namen)
3. Region: Wählen Sie **Automatic** (für optimale Performance weltweit)
4. Klicken Sie auf **"Create bucket"**

### 3. Videos hochladen

**Dateien zum Hochladen:**
- `Loop Mastermind.mp4` (80MB) - Für Hero-Section
- `Mastermind Aftermovie final.mp4` (580MB) - Für Aftermovie-Section

**Upload-Schritte:**
1. Öffnen Sie Ihren Bucket `mastermind-dubai-media`
2. Klicken Sie auf **"Upload"**
3. Laden Sie beide Video-Dateien hoch
4. Warten Sie, bis der Upload abgeschlossen ist

### 4. Öffentlichen Zugriff konfigurieren

#### Option A: R2.dev Subdomain (Einfach, kostenlos)

1. Gehen Sie zu Ihrem Bucket
2. Klicken Sie auf **"Settings"**
3. Unter **"Public access"** → **"R2.dev subdomain"**
4. Klicken Sie auf **"Allow Access"**
5. Sie erhalten eine URL wie: `https://pub-xxxxx.r2.dev`

**Ihre Video-URLs werden dann:**
```
https://pub-xxxxx.r2.dev/Loop%20Mastermind.mp4
https://pub-xxxxx.r2.dev/Mastermind%20Aftermovie%20final.mp4
```

#### Option B: Custom Domain (Erweitert, professionell)

1. Gehen Sie zu **"Settings"** in Ihrem Bucket
2. Unter **"Custom Domains"** → **"Connect Domain"**
3. Geben Sie Ihre Domain ein (z.B. `media.chrissteiner.at`)
4. Folgen Sie den DNS-Anweisungen
5. Warten Sie auf DNS-Propagierung (kann bis zu 48h dauern)

**Ihre Video-URLs werden dann:**
```
https://media.chrissteiner.at/Loop%20Mastermind.mp4
https://media.chrissteiner.at/Mastermind%20Aftermovie%20final.mp4
```

### 5. URLs in der Website aktualisieren

Nachdem Sie die URLs haben, aktualisieren Sie diese Dateien:

#### src/components/Hero.tsx
```tsx
// Ersetzen Sie:
<source src="/media/Loop Mastermind.mp4" type="video/mp4" />

// Mit Ihrer R2 URL:
<source src="https://pub-xxxxx.r2.dev/Loop%20Mastermind.mp4" type="video/mp4" />
```

#### src/components/Aftermovie.tsx
```tsx
// Ersetzen Sie:
<source src="/media/Mastermind Aftermovie final.mp4" type="video/mp4" />

// Mit Ihrer R2 URL:
<source src="https://pub-xxxxx.r2.dev/Mastermind%20Aftermovie%20final.mp4" type="video/mp4" />
```

### 6. CORS-Konfiguration (falls erforderlich)

Wenn Videos nicht laden, fügen Sie CORS-Header hinzu:

1. Gehen Sie zu Ihrem Bucket → **"Settings"**
2. Scrollen Sie zu **"CORS policy"**
3. Fügen Sie folgende Konfiguration hinzu:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

### 7. Performance-Optimierung

#### Cache-Einstellungen
Cloudflare cached R2-Inhalte automatisch, aber Sie können dies optimieren:

1. **Transform Rules** in Cloudflare Dashboard
2. Setzen Sie `Cache-Control` Headers:
   - Videos: `public, max-age=31536000` (1 Jahr)

#### Bandwidth Alliance
- Falls Sie andere Cloudflare-Services nutzen, profitieren Sie von kostenlosem Bandwidth

## Kosten-Übersicht

### R2 Pricing (Stand 2024)

**Speicherung:**
- Erste 10 GB/Monat: **Kostenlos**
- Darüber: $0.015 pro GB/Monat

**Für Ihre Videos (~660MB):**
- Kosten: **Kostenlos** (unter 10 GB)

**Class A Operations (Uploads, Lists):**
- Erste 1 Million/Monat: **Kostenlos**

**Class B Operations (Downloads):**
- Erste 10 Millionen/Monat: **Kostenlos**

**Egress (Ausgangsverkehr):**
- **Immer kostenlos** (Hauptvorteil von R2!)

### Alternative: Bei WIX-Integration

Falls Sie die Website in WIX integrieren, können Sie auch:
- Videos direkt bei WIX hosten (aber teurer und langsamer)
- R2 verwenden (empfohlen für bessere Performance)

## Troubleshooting

### Videos laden nicht
1. Prüfen Sie die URL im Browser direkt
2. Überprüfen Sie CORS-Einstellungen
3. Stellen Sie sicher, dass "Public Access" aktiviert ist

### Langsame Ladezeiten
1. Aktivieren Sie Cloudflare CDN
2. Verwenden Sie Custom Domain für besseres Caching
3. Komprimieren Sie Videos (optional, aktuell sind sie gut optimiert)

### Video-Dateigröße reduzieren (optional)

Falls Sie die Dateigröße weiter reduzieren möchten:

```bash
# Mit ffmpeg (Terminal):
ffmpeg -i "Loop Mastermind.mp4" -c:v libx264 -crf 28 -preset slow "Loop_Mastermind_optimized.mp4"
ffmpeg -i "Mastermind Aftermovie final.mp4" -c:v libx264 -crf 28 -preset slow "Aftermovie_optimized.mp4"
```

## Support

Bei Fragen zu Cloudflare R2:
- [Cloudflare R2 Dokumentation](https://developers.cloudflare.com/r2/)
- [Cloudflare Community](https://community.cloudflare.com/)

## Nächste Schritte

Nach dem R2-Setup:
1. Testen Sie die Video-URLs im Browser
2. Aktualisieren Sie die Komponenten mit den neuen URLs
3. Testen Sie die Website lokal
4. Deployen Sie die Website
5. Siehe `WIX-INTEGRATION-GUIDE.md` für WIX-Integration
