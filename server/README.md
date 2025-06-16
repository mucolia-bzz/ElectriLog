# ElectriLog Server API Documentation

This document provides information about the API endpoints available in the ElectriLog server application.

## Table of Contents
- [Overview](#overview)
- [Data Upload Endpoints](#data-upload-endpoints)
- [Data Retrieval Endpoints](#data-retrieval-endpoints)
- [Data Export Endpoints](#data-export-endpoints)
- [Calculation Endpoints](#calculation-endpoints)

## Overview

ElectriLog is a system for processing and analyzing electricity meter data. The server provides APIs for:
- Uploading and processing electricity meter data in different formats (SDAT, ESL)
- Retrieving processed data
- Exporting data in different formats (JSON, CSV)
- Performing calculations on the data

## Data Upload Endpoints

### Upload SDAT Files

```
POST /upload/sdat
```

Uploads and processes SDAT files (XML format).

**Request:**
- Content-Type: multipart/form-data
- Body: file[] (multiple files allowed)

**Response:**
- Content-Type: application/json
- Body: Success message with number of processed files

### Upload ESL Files

```
POST /upload/esl
```

Uploads and processes ESL files (XML format).

**Request:**
- Content-Type: multipart/form-data
- Body: file[] (multiple files allowed)

**Response:**
- Content-Type: application/json
- Body: Success message with number of processed files

### Read SDAT Files

```
POST /read/sdat
```

Alternative endpoint for uploading and processing SDAT files.

**Request:**
- Content-Type: multipart/form-data
- Body: file[] (multiple files allowed)

**Response:**
- Content-Type: application/json
- Body: Success message with number of processed files

### Read ESL Files

```
POST /read/esl
```

Alternative endpoint for uploading and processing ESL files.

**Request:**
- Content-Type: multipart/form-data
- Body: file[] (multiple files allowed)

**Response:**
- Content-Type: application/json
- Body: Success message with number of processed files

## Data Retrieval Endpoints

### Get Consumption Data

```
GET /data/consumption/{sensorId}
```

Retrieves consumption data for a specific sensor.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: application/json
- Body: JSON object with sensorId and data array

### Get Meter Data

```
GET /data/meter/{sensorId}
```

Retrieves meter data for a specific sensor.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: application/json
- Body: JSON object with sensorId and data array

### Get Consumption Data (Alternative)

```
GET /read/data/consumption/{sensorId}
```

Alternative endpoint for retrieving consumption data.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: application/json
- Body: JSON object with sensorId and data array

### Get Meter Data (Alternative)

```
GET /read/data/meter/{sensorId}
```

Alternative endpoint for retrieving meter data.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: application/json
- Body: JSON object with sensorId and data array

## Data Export Endpoints

### Export Data as JSON

```
GET /export/json/{sensorId}
```

Exports sensor data in JSON format.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: application/json
- Body: JSON array containing sensor data

### Export Data as CSV

```
GET /export/csv/{sensorId}
```

Exports sensor data in CSV format.

**Parameters:**
- sensorId (path): ID of the sensor (e.g., "ID735" for Einspeisung, "ID742" for Bezug)

**Response:**
- Content-Type: text/csv
- Body: CSV data with timestamp and value columns
- Headers: Content-Disposition: attachment; filename="{sensorId}.csv"

## Calculation Endpoints

### Calculate Meter Readings from Consumption Data

```
GET /calculate/upload-consumption-to-meter
```

Calculates meter readings from consumption data.

**Parameters:**
- sensorId (query, optional): ID of the sensor to calculate for. If not provided, calculates for all sensors.

**Response:**
- Content-Type: application/json
- Body: Success message with list of processed sensors

### Calculate Meter Readings from Consumption Data (Alternative)

```
GET /calculate/read-consumption-to-meter
```

Alternative endpoint for calculating meter readings from consumption data.

**Parameters:**
- sensorId (query, optional): ID of the sensor to calculate for. If not provided, calculates for all sensors.

**Response:**
- Content-Type: application/json
- Body: Success message with list of processed sensors

## Data Format

### Sensor Data Response Format

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

- ts: Unix timestamp (seconds since epoch)
- value: Meter reading or consumption value
