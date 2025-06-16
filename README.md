# ElectriLog

ElectriLog is a system for processing and analyzing electricity meter data. It consists of a client and server component.

## Project Structure

- **client/** - Frontend application
- **server/** - Backend API server

## Server API

The server provides a REST API for uploading, processing, retrieving, and exporting electricity meter data.

For detailed API documentation, see the [Server API Documentation](server/README.md).

## Features

- Upload and process electricity meter data in different formats (SDAT, ESL)
- Retrieve processed data
- Export data in different formats (JSON, CSV)
- Perform calculations on the data

## Getting Started

### Server

The server is a Spring Boot application written in Kotlin. To run the server:

1. Navigate to the server directory: `cd server`
2. Build the application: `./gradlew build`
3. Run the application: `./gradlew bootRun`

The server will start on port 8080 by default.

### Client

The client is a web application. To run the client:

1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

The client will be available at http://localhost:3000 by default.

## API Endpoints Overview

### Data Upload

- `POST /upload/sdat` - Upload SDAT files
- `POST /upload/esl` - Upload ESL files
- `POST /read/sdat` - Alternative endpoint for uploading SDAT files
- `POST /read/esl` - Alternative endpoint for uploading ESL files

### Data Retrieval

- `GET /data/consumption/{sensorId}` - Get consumption data
- `GET /data/meter/{sensorId}` - Get meter data
- `GET /read/data/consumption/{sensorId}` - Alternative endpoint for getting consumption data
- `GET /read/data/meter/{sensorId}` - Alternative endpoint for getting meter data

### Data Export

- `GET /export/json/{sensorId}` - Export data as JSON
- `GET /export/csv/{sensorId}` - Export data as CSV

### Calculations

- `GET /calculate/upload-consumption-to-meter` - Calculate meter readings from consumption data
- `GET /calculate/read-consumption-to-meter` - Alternative endpoint for calculating meter readings

For more details, see the [Server API Documentation](server/README.md).