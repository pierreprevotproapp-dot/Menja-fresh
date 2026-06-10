# App-Store-Fahrplan — Menja Fresh

Vom heutigen PWA-Stand zur nativen App im **Apple App Store** und **Google Play**.
Die zwei echten Brocken sind (1) der **native Wrapper (Capacitor)** und (2) **Apple
In-App-Käufe statt Stripe** für Premium. Alles andere ist Fleißarbeit.

---

## Phase 0 — Voraussetzungen (1 Tag, ~125 €/Jahr)

- [ ] **Apple Developer Program** — 99 $/Jahr (developer.apple.com). Als Einzelperson
      möglich (passt zu „Privatperson" im Impressum).
- [ ] **Google Play Developer** — 25 $ einmalig.
- [ ] **Mac mit Xcode** für den iOS-Build (zwingend für Apple — ohne Mac kein iOS-Release).
- [ ] Entscheidung **Zahlungsmodell** (siehe Phase 3) — vor allem anderen klären, weil es
      die Architektur bestimmt.

---

## Phase 1 — Capacitor-Wrapper (1–2 Tage)

Capacitor packt die bestehende Web-App (app.html + Assets) 1:1 in eine native Hülle.
Kein Rewrite nötig.

```bash
npm install @capacitor/core @capacitor/cli
npx cap init "Menja Fresh" com.menjafresh.app --web-dir .
npm install @capacitor/ios @capacitor/android
npx cap add ios && npx cap add android
```

`capacitor.config.ts`:
```ts
import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.menjafresh.app',
  appName: 'Menja Fresh',
  webDir: '.',
  server: { androidScheme: 'https' }
};
export default config;
```

- [ ] Icons + Splash automatisch erzeugen (Quelle: `resources/icon.svg`, `resources/splash.svg`):
  ```bash
  npm install -D @capacitor/assets
  npx capacitor-assets generate --iconBackgroundColor "#234227" --splashBackgroundColor "#FBF5E9"
  ```
- [ ] `npx cap sync` nach jedem Web-Update.
- [ ] In Xcode / Android Studio öffnen: `npx cap open ios` / `npx cap open android`.

**Wichtige Anpassungen für die native Hülle:**
- [ ] Den **Service-Worker-Unregister-Code** prüfen — im nativen WebView nicht nötig, stört aber nicht.
- [ ] **Affiliate-/Partner-Links** (Carrefour usw.) im nativen In-App-Browser öffnen:
  ```bash
  npm install @capacitor/browser
  ```
  `Browser.open({ url })` statt `window.open` — sonst meckert Apple (Review 4.2) und der
  Kauf-Flow bricht. (Externe Käufe physischer Waren sind erlaubt — siehe Phase 3.)
- [ ] Safe-Area / Notch: `@capacitor/status-bar` + CSS `env(safe-area-inset-*)`.

---

## Phase 2 — Native Politur (1–2 Tage)

- [ ] **@capacitor/status-bar** — Statusleiste farblich an die App anpassen.
- [ ] **@capacitor/splash-screen** — Splash sauber ein-/ausblenden.
- [ ] **Deep Links / Universal Links** — `.well-known/assetlinks.json` (Android, schon angelegt)
      + `apple-app-site-association` (iOS) mit echtem Team-ID füllen.
- [ ] *(optional)* **Push** via `@capacitor/push-notifications` — rechtfertigt „App-Sein"
      (Review 4.2) und bringt Re-Engagement („Plane deine Woche").

---

## Phase 3 — Zahlungen: der kritische Punkt ⚠️

**Apple-Regel (3.1.1):** Digitale Inhalte/Abos, die **in der App** konsumiert werden,
**müssen** über Apple In-App-Käufe laufen (15 % im Small-Business-Programm < 1 Mio $/Jahr,
sonst 30 %). **Stripe ist dafür in der iOS-App nicht erlaubt.**

**Erlaubt bleibt extern (Stripe / Partner):**
- Physische Waren & Lieferung (Lebensmittel-Einkauf, Carrefour-Affiliate) ✅
- Käufe auf der **Website** menja-fresh.com ✅

**Konsequenz fürs Premium-Abo:**
| Plattform | Abo-Abwicklung |
|-----------|----------------|
| iOS-App | **Apple IAP** (Pflicht) |
| Android-App | **Google Play Billing** (Pflicht) |
| Web / PWA | **Stripe** (wie bisher) |

**Empfehlung: RevenueCat** als Abstraktionsschicht.
- Vereint Apple IAP + Google Billing + (optional) Stripe hinter **einem** Entitlement
  („premium aktiv: ja/nein").
- Kostenlos bis 2.500 $ Tracked Revenue/Monat.
- Spart die fehleranfällige eigene Receipt-Validierung.

**To-dos:**
- [ ] In App Store Connect / Play Console die Abo-Produkte anlegen (z. B. `premium_monthly`
      4,99 € / `premium_yearly` 44 €, 7 Tage Trial) — **identische Preise** wie Stripe.
- [ ] RevenueCat-Projekt + `@revenuecat/purchases-capacitor` einbinden.
- [ ] `isPremium()` in app.html so umbauen, dass die Quelle der Wahrheit das RevenueCat-
      Entitlement ist, wenn nativ; Stripe-Status bleibt für Web. (Heute liest die App den
      Tier aus `stripe_customers` — das muss serverseitig mit RevenueCat-Webhooks gemerged
      werden, damit ein Nutzer plattformübergreifend Premium behält.)
- [ ] Im nativen Build die Stripe-Checkout-Buttons durch den IAP-Kauf ersetzen
      (Plattform-Weiche: `Capacitor.isNativePlatform()`).
- [ ] **Restore Purchases**-Button (Apple-Pflicht).

> Aufwand-Hinweis: Das ist der größte Einzelposten (~3–5 Tage inkl. Entitlement-Sync).
> Wenn ein schneller Launch zählt: Premium im **iOS-Build zunächst ausblenden** und nur
> die kostenlosen Funktionen ausliefern — dann ist keine IAP-Integration nötig und der
> Review ist deutlich einfacher. Premium per IAP in einem Folge-Update nachziehen.

---

## Phase 4 — Store-Eintrag (½ Tag — größtenteils erledigt)

- [x] **App-Icon** 1024 — `store/icon-1024.png`
- [x] **Screenshots** 6.7" — `store/screenshots/` (für EN/ES/FR ggf. neu rendern)
- [x] **Beschreibung / Keywords** 4 Sprachen — `store/listing.md`
- [x] **Altersfreigabe** — `store/age-rating.md` (Apple 4+, Play Everyone)
- [x] **Konto löschen** (Apple-Pflicht) — bereits in der App + Edge Function
- [x] **Privacy Policy** live (4 Sprachen)
- [ ] **App-Privacy „Nutrition Label"** (Apple) + **Data Safety** (Google) ausfüllen —
      Vorlage in `age-rating.md`.
- [ ] Support-URL, Marketing-URL, Kategorie (Food & Drink) eintragen.

---

## Phase 5 — Review-Stolperfallen (vorher abhaken)

- [ ] **4.2 Minimum Functionality:** darf nicht wie „nur eine Website" wirken → native
      Splash/Statusbar/In-App-Browser, idealerweise Push. (Wir sind hier grenzwertig —
      die genannten nativen Features absichern.)
- [ ] **3.1.1 IAP:** keine externen Bezahl-Links für das digitale Abo in der iOS-App.
- [ ] **Sign in with Apple:** **nur Pflicht, wenn** ihr Drittanbieter-Login (Google/Facebook)
      anbietet. Bei reinem E-Mail/Passwort-Login **nicht** nötig — kurz den aktuellen Login
      prüfen.
- [ ] **Demo-Zugang** für das Review-Team hinterlegen (Test-Account mit Premium freigeschaltet).
- [ ] Export-Compliance (Verschlüsselung): Standard-HTTPS → „nutzt nur Standard-Krypto" anklicken.

---

## Phase 6 — Build & Submit

```bash
npx cap sync
npx cap open ios      # Xcode: Archive -> Distribute -> App Store Connect
npx cap open android  # Android Studio: Signed App Bundle (.aab) -> Play Console
```
- [ ] iOS: über **TestFlight** intern testen, dann zur Prüfung einreichen.
- [ ] Android: **Internal Testing** Track, dann Produktion.

---

## Empfohlene Reihenfolge (realistisch)

1. **Phase 0 + 1 + 2** → lauffähige native App ohne Premium (≈ 1 Woche).
2. **Phase 4 + 5** → Store-Einträge fertig, intern testen.
3. **Soft-Launch** (nur Gratis-Funktionen, Premium iOS ausgeblendet) → schnelles Feedback,
   einfacher Review.
4. **Phase 3 (IAP/RevenueCat)** als Folge-Update → Premium auf allen Plattformen.

**Grobe Schätzung:** MVP-Launch (ohne IAP) ~1–1,5 Wochen Arbeit; voller Launch inkl.
plattformübergreifendem Premium ~2,5–3 Wochen.
