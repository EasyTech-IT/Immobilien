# Makaan Bestatigungs-Mail

Die Dateien in diesem Ordner sind eine versandfertige, responsive Vorlage fur Kontakt- und Analyse-Anfragen:

- `confirmation-template.html`: Tabellenbasiertes HTML fur Gmail, Outlook, Apple Mail und mobile Clients
- `confirmation-template.txt`: Plain-Text-Fallback

## Payload

Der Versanddienst sollte diese Felder an die Vorlage ubergeben:

```json
{
  "vorname": "...",
  "nachname": "...",
  "unternehmen": "...",
  "email": "...",
  "telefon": "...",
  "anliegen": "...",
  "leistung": "...",
  "analyse": "...",
  "weitere_angaben": "...",
  "uebersicht": "..."
}
```

`uebersicht` sollte nur relevante, tatsachlich vorhandene Angaben als bereits escapedes HTML enthalten. Leere Felder werden vor dem Template-Rendering entfernt; die `{{#if ...}}`-Bloecke sind fuer einen Template-Renderer wie Handlebars, Mustache oder die Template-Sprache des gewahlten E-Mail-Dienstes vorgesehen.

## Versand

Die aktuelle Website besitzt keinen Backend- oder E-Mail-Dienst und kann aus Sicherheitsgrunden keine echte Empfanger-Mail direkt aus dem Browser versenden. Fur den produktiven Versand muss der Submit-Handler an einen Server/API-Endpunkt angebunden werden, zum Beispiel:

1. Formular sendet validierte Daten per `POST` an den eigenen Server.
2. Der Server validiert und bereinigt die Daten erneut.
3. Der Server rendert HTML- und Textvorlage.
4. Der Server versendet die Bestatigung uber einen SMTP-/E-Mail-Anbieter.
5. Die Website zeigt erst nach erfolgreicher API-Antwort den Success-State.

Die Vorlagen verwenden keine erfundenen Termine, Ergebnisse oder Kundendaten.
