# ElectriLog

ElectriLog ist ein System zur Verarbeitung und Analyse von Stromzählerdaten. Es besteht aus einer Client- und einer Server-Komponente.

## Architekturübersicht

ElectriLog folgt einer Client-Server-Architektur:

- **Client**: Eine mit React, TypeScript und Vite erstellte Webanwendung, die eine Benutzeroberfläche zum Hochladen von Dateien, Visualisieren von Daten und Exportieren von Ergebnissen bietet.
- **Server**: Eine in Kotlin geschriebene Spring Boot-Anwendung, die Stromzählerdaten verarbeitet, Berechnungen durchführt und eine RESTful API bereitstellt.

### Systemarchitektur

Das System ist in folgende Schichten organisiert:

1. **Präsentationsschicht** (Client)
   - Benutzeroberfläche für Datei-Upload, Datenvisualisierung und Export

2. **API-Schicht** (Server)
   - RESTful-Endpunkte für Datenverarbeitung, -abruf und -export

3. **Serviceschicht** (Server)
   - Geschäftslogik zur Verarbeitung von Zählerdaten
   - Berechnung von Zählerständen aus Verbrauchsdaten

4. **Datenschicht** (Server)
   - In-Memory-Speicherung verarbeiteter Daten (könnte auf eine Datenbank erweitert werden)
   - Datenmodelle und Entitäten

## Projektstruktur

- **client/** - Frontend-Anwendung
- **server/** - Backend-API-Server

## Funktionen

- Hochladen und Verarbeiten von Stromzählerdaten in verschiedenen Formaten (SDAT, ESL)
- Abrufen verarbeiteter Daten
- Exportieren von Daten in verschiedenen Formaten (JSON, CSV)
- Durchführen von Berechnungen mit den Daten
- Visualisieren von Daten in Diagrammen und Grafiken

## Erste Schritte

### Server

Der Server ist eine in Kotlin geschriebene Spring Boot-Anwendung. Um den Server zu starten:

1. Navigieren Sie zum Server-Verzeichnis: `cd server`
2. Bauen Sie die Anwendung: `./gradlew build`
3. Starten Sie die Anwendung: `./gradlew bootRun`

Der Server startet standardmäßig auf Port 8080.

### Client

Der Client ist eine mit React, TypeScript und Vite erstellte Webanwendung. Um den Client zu starten:

1. Navigieren Sie zum Client-Verzeichnis: `cd client`
2. Installieren Sie die Abhängigkeiten: `npm install`
3. Starten Sie den Entwicklungsserver: `npm run dev`

Der Client ist standardmäßig unter http://localhost:3000 verfügbar.

## API-Endpunkte Übersicht

### Daten-Upload

- `POST /data/upload/sdat` - SDAT-Dateien hochladen
- `POST /data/upload/esl` - ESL-Dateien hochladen

### Datenabruf

- `GET /data/consumption/{sensorId}` - Verbrauchsdaten abrufen
- `GET /data/meter/{sensorId}` - Zählerstandsdaten abrufen

### Datenexport

- `GET /export/json/{sensorId}` - Daten als JSON exportieren
- `GET /export/csv/{sensorId}` - Daten als CSV exportieren

### Berechnungen

- `GET /data/calculate` - Zählerstände aus Verbrauchsdaten berechnen

Weitere Details finden Sie in der [Server-API-Dokumentation](server/README.md).

## Verwendete Technologien

### Server
- Spring Boot
- Kotlin
- Jackson (JSON/XML-Verarbeitung)
- JUnit (Testing)

### Client
- React
- TypeScript
- Vite
- CSS Modules
