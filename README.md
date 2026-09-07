# Makaan — Immobilienportal

Vollständig überarbeitete Version des Original-Templates: neues Design, echte
Filter-/Suchfunktion, Property-Detail-Seite und ein Admin-Dashboard zur
Verwaltung der Immobilien.

## Seiten
- `index.html` – Startseite mit Live-Suche und hervorgehobenen Angeboten
- `property-list.html` – Alle Immobilien mit Filtern (Typ, Status, Stadt, Preis, Zimmer), Sortierung, Pagination
- `property-detail.html?id=...` – Detailseite mit Galerie, Ausstattung, Kontaktformular
- `about.html`, `contact.html`, `testimonial.html`, `404.html`
- `admin/login.html` + `admin/dashboard.html` – Verwaltung: Immobilien hinzufügen, bearbeiten, löschen

## Admin-Zugang (Demo)
Zugangscode: **makaan2026**
→ einfach über den Link „Admin“ im Menü oder direkt `admin/login.html` öffnen.

## Wichtig: Datenspeicherung
Diese Seite ist reines Frontend (HTML/CSS/JS), es gibt keinen Server und keine
Datenbank. Alle Immobiliendaten liegen im **localStorage des Browsers**:

- Änderungen im Admin-Dashboard sind sofort auf der ganzen Seite sichtbar —
  aber nur in dem Browser, in dem sie vorgenommen wurden.
- Andere Besucher (oder du selbst in einem anderen Browser/Gerät) sehen
  weiterhin die ursprünglichen Demo-Daten.
- Der Login ist eine reine Komfort-Sperre ohne echte Sicherheit — der
  Zugangscode steht offen im JavaScript-Code.

Für eine echte Mehrbenutzer-Lösung mit zentraler Datenbank (z. B. PHP + MySQL)
und echtem Login müsste ein Backend ergänzt werden — sag Bescheid, falls das
der nächste Schritt sein soll.

## Lokal testen
Einfach `index.html` per Doppelklick öffnen oder mit einem lokalen Server
starten, z. B.:

```
python3 -m http.server 8080
```

und dann `http://localhost:8080` aufrufen.

## Copyright & Nutzung
© 2026 [Ihr Name]. Alle Rechte vorbehalten.  
Die Nutzung, Vervielfältigung oder Verbreitung der Inhalte (einschließlich Karten und Grafiken) ist ohne ausdrückliche schriftliche Genehmigung untersagt.
