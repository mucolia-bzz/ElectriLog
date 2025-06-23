# ElectriLog Server

## Architekturübersicht

ElectriLog ist eine Client-Server-Anwendung, die entwickelt wurde, um Stromzählerdaten aus SDAT- und ESL-Dateien zu verarbeiten und zu analysieren. Die Server-Komponente ist mit Spring Boot und Kotlin erstellt und bietet eine RESTful API für Datenverarbeitung, -speicherung und -abruf.

### Systemarchitektur

Das System folgt einem Schichtenarchitekturmuster:

1. **Controller-Schicht**: Verarbeitet HTTP-Anfragen und -Antworten
2. **Service-Schicht**: Enthält Geschäftslogik und Datenverarbeitung
3. **Modell-Schicht**: Definiert Datenstrukturen und Entitäten
4. **Utility-Schicht**: Stellt Hilfsfunktionen und Werkzeuge bereit

### Komponenten

#### Controller

- **DataController**: Verarbeitet Daten-Upload, -Verarbeitung und -Abrufoperationen
- **ExportController**: Verwaltet den Datenexport in verschiedenen Formaten (JSON, CSV)

#### Services

- **MeterDataService**: Kernservice für die Verarbeitung von Zählerdaten, Handhabung von SDAT- und ESL-Dateien und Durchführung von Berechnungen

#### Modelle

- **Messwert**: Repräsentiert einen Messwert mit Zeitstempel, Wert und Typ
- **MesswertType**: Enum für Messwerttypen (ABSOLUT, RELATIV)

#### Entitäten

- **SdatEntity**: Repräsentiert die Struktur von SDAT-XML-Dateien
- **EslEntity**: Repräsentiert die Struktur von ESL-XML-Dateien

#### Utilities

- **FileProcesser**: Verarbeitet XML-Datei-Parsing und -Verarbeitung

### Datenfluss

1. **Daten-Upload**:
   - Client lädt SDAT- oder ESL-Dateien über den DataController hoch
   - Dateien werden vom MeterDataService verarbeitet
   - Geparste Daten werden im Speicher gespeichert (in einer Produktionsumgebung wäre dies eine Datenbank)

2. **Datenverarbeitung**:
   - SDAT-Dateien liefern Verbrauchsdaten (relative Werte)
   - ESL-Dateien liefern Zählerstände (absolute Werte)
   - Das System kann Zählerstände aus Verbrauchsdaten berechnen

3. **Datenabruf und -export**:
   - Verarbeitete Daten können über API-Endpunkte abgerufen werden
   - Daten können im JSON- oder CSV-Format exportiert werden

## API-Dokumentation

### Daten-Upload-Endpunkte

#### SDAT-Dateien hochladen

```
POST /data/upload/sdat
```

Lädt SDAT-Dateien hoch und verarbeitet sie (XML-Format).

**Anfrage:**
- Content-Type: multipart/form-data
- Body: file[] (mehrere Dateien erlaubt)

**Antwort:**
- Content-Type: application/json
- Body: Erfolgsmeldung mit Anzahl der verarbeiteten Dateien

#### ESL-Dateien hochladen

```
POST /data/upload/esl
```

Lädt ESL-Dateien hoch und verarbeitet sie (XML-Format).

**Anfrage:**
- Content-Type: multipart/form-data
- Body: file[] (mehrere Dateien erlaubt)

**Antwort:**
- Content-Type: application/json
- Body: Erfolgsmeldung mit Anzahl der verarbeiteten Dateien

### Datenabruf-Endpunkte

#### Verbrauchsdaten abrufen

```
GET /data/consumption/{sensorId}
```

Ruft Verbrauchsdaten für einen bestimmten Sensor ab.

**Parameter:**
- sensorId (Pfad): ID des Sensors (z.B. "ID735" für Einspeisung, "ID742" für Bezug)

**Antwort:**
- Content-Type: application/json
- Body: JSON-Objekt mit sensorId und Daten-Array

#### Zählerdaten abrufen

```
GET /data/meter/{sensorId}
```

Ruft Zählerdaten für einen bestimmten Sensor ab.

**Parameter:**
- sensorId (Pfad): ID des Sensors (z.B. "ID735" für Einspeisung, "ID742" für Bezug)

**Antwort:**
- Content-Type: application/json
- Body: JSON-Objekt mit sensorId und Daten-Array

### Datenexport-Endpunkte

#### Daten als JSON exportieren

```
GET /export/json/{sensorId}
```

Exportiert Sensordaten im JSON-Format.

**Parameter:**
- sensorId (Pfad): ID des Sensors (z.B. "ID735" für Einspeisung, "ID742" für Bezug)

**Antwort:**
- Content-Type: application/json
- Body: JSON-Array mit Sensordaten

#### Daten als CSV exportieren

```
GET /export/csv/{sensorId}
```

Exportiert Sensordaten im CSV-Format.

**Parameter:**
- sensorId (Pfad): ID des Sensors (z.B. "ID735" für Einspeisung, "ID742" für Bezug)

**Antwort:**
- Content-Type: text/csv
- Body: CSV-Daten mit Zeitstempel- und Wertespalten
- Headers: Content-Disposition: attachment; filename="{sensorId}.csv"

### Berechnungs-Endpunkte

#### Zählerstände aus Verbrauchsdaten berechnen

```
GET /data/calculate
```

Berechnet Zählerstände aus Verbrauchsdaten.

**Parameter:**
- sensorId (Abfrage, optional): ID des Sensors, für den berechnet werden soll. Wenn nicht angegeben, wird für alle Sensoren berechnet.

**Antwort:**
- Content-Type: application/json
- Body: Erfolgsmeldung mit Liste der verarbeiteten Sensoren

## Datenformat

### Sensordaten-Antwortformat

```json
{
  "sensorId": "ID742",
  "data": [
    {
      "ts": "1609459200",
      "value": 12345.67
    },
    {
      "ts": "1609545600",
      "value": 12346.89
    }
  ]
}
```

- ts: Unix-Zeitstempel (Sekunden seit Epoche)
- value: Zählerstand oder Verbrauchswert

## Verwendete Technologien

- **Spring Boot**: Web-Framework zum Erstellen der REST-API
- **Kotlin**: Programmiersprache
- **Jackson**: JSON- und XML-Verarbeitung
- **JUnit**: Test-Framework
