# App-Store-Assets — Menja Fresh

Alles, was für die Einreichung bei Apple App Store & Google Play gebraucht wird.
Alle Bilder werden aus den Master-SVGs in `../resources/` erzeugt – nie von Hand bearbeiten,
sondern SVG ändern und neu rendern.

## Inhalt

| Datei | Zweck |
|-------|-------|
| `age-rating.md` | Altersfreigabe: Fragebogen-Antworten + Ergebnis (Apple 4+, Play Everyone) |
| `listing.md` | Name, Untertitel, Keywords, Beschreibung — DE/EN/ES/FR, mit Zeichenlimits |
| `icon-1024.png` | App-Icon 1024×1024 (App Store Marketing-Icon / Capacitor-Quelle) |
| `splash-2732.png` | Splash 2732×2732 (Capacitor-Quelle) |
| `screenshots/de-67-*.png` | 5 Store-Screenshots 1290×2796 (iPhone 6.7") |

Im Repo-Root (für die PWA, von `manifest.json` + `app.html` referenziert):
`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png`.

## Neu rendern

```bash
npm install sharp           # einmalig
node resources/generate.js              # Icons + Splash
node resources/generate-screenshots.js  # Store-Screenshots (lädt echte Rezeptfotos)
```

## Screenshot-Größen, die die Stores verlangen

- **Apple (Pflicht):** iPhone **6.7"** = 1290×2796 (✓ erzeugt). Diese werden für 6.5" mitverwendet.
  iPad nur nötig, falls die App iPad unterstützt (13" = 2064×2752).
- **Google Play:** mind. 2 Telefon-Screenshots, 320–3840 px Kantenlänge — die 1290×2796 passen direkt.
- Apple erlaubt bis zu 10 Screenshots je Sprache. Für ES/FR/EN ggf. die Captions im
  Script übersetzen und erneut rendern (Slides-Array anpassen).

## Native Hülle (wenn ihr in die Stores wollt)

Eine PWA kann nicht direkt eingereicht werden — sie muss in eine native Hülle.
Empfohlen: **Capacitor**.

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Menja Fresh" com.menjafresh.app --web-dir .
npm install @capacitor/ios @capacitor/android
npx cap add ios && npx cap add android

# Icons + Splash für alle Gerätegrößen automatisch erzeugen:
npm install -D @capacitor/assets
npx capacitor-assets generate --iconBackgroundColor "#234227" --splashBackgroundColor "#FBF5E9"
#  -> nutzt resources/icon.svg (bzw. icon-1024.png) und resources/splash.svg
```

⚠️ **Wichtig vor dem Launch:** Premium-Abos müssen bei Apple über **In-App-Käufe**
laufen (nicht Stripe). Für rein physische Käufe/Affiliate-Links (Lieferung) bleibt
externe Bezahlung erlaubt. Details siehe Projekt-Notizen.

## Android App Links

`../.well-known/assetlinks.json` ist angelegt (Paket `com.menjafresh.app`).
Vor dem Android-Release den Platzhalter `REPLACE_WITH_YOUR_KEYSTORE_SHA256_FINGERPRINT`
durch den echten SHA-256-Fingerprint des Release-Keystores ersetzen.
