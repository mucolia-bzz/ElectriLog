# ElectriLog Client

Dies ist die Client-Komponente des ElectriLog-Systems, eine Webanwendung zur Verarbeitung und Analyse von Stromzählerdaten.

## Übersicht

Der ElectriLog-Client ist eine moderne Webanwendung, die mit React, TypeScript und Vite entwickelt wurde. Sie bietet eine Benutzeroberfläche für:

- Hochladen von Stromzählerdaten (SDAT, ESL)
- Visualisieren von verarbeiteten Daten
- Exportieren von Daten in verschiedenen Formaten

## Projektstruktur

```
client/
├── public/             # Statische Assets
├── src/                # Quellcode
│   ├── assets/         # Bilder, Fonts und andere Assets
│   ├── components/     # Wiederverwendbare UI-Komponenten
│   │   └── ui/         # Basis-UI-Komponenten
│   ├── lib/            # Hilfsfunktionen und Utilities
│   ├── App.tsx         # Hauptkomponente der Anwendung
│   └── main.tsx        # Einstiegspunkt der Anwendung
└── ...                 # Konfigurationsdateien
```

## Technologien

- **React**: JavaScript-Bibliothek für Benutzeroberflächen
- **TypeScript**: Typsicheres JavaScript
- **Vite**: Build-Tool und Entwicklungsserver
- **Tailwind CSS**: Utility-First CSS-Framework

## Erste Schritte

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

1. Klonen Sie das Repository:
   ```
   git clone https://github.com/yourusername/ElectriLog.git
   ```

2. Navigieren Sie zum Client-Verzeichnis:
   ```
   cd ElectriLog/client
   ```

3. Installieren Sie die Abhängigkeiten:
   ```
   npm install
   # oder
   yarn
   ```

### Entwicklung

Starten Sie den Entwicklungsserver:

```
npm run dev
# oder
yarn dev
```

Die Anwendung ist dann unter http://localhost:5173 verfügbar.

### Build

Erstellen Sie eine Produktionsversion:

```
npm run build
# oder
yarn build
```

Die Build-Dateien werden im `dist`-Verzeichnis erstellt.

## Verbindung zum Server

Der Client kommuniziert mit dem ElectriLog-Server über RESTful API-Endpunkte. Standardmäßig wird erwartet, dass der Server unter `http://localhost:8080` läuft.

## Weitere Informationen

Weitere Details zur gesamten ElectriLog-Anwendung finden Sie in der [Haupt-README](../README.md) und der [Server-README](../server/README.md).
