package ch.com.electrilog.exportcontroller

import ch.com.electrilog.shared.service.MeterDataService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

/**
 * Controller for exporting meter data in different formats.
 */
@RestController
class ExportController {
    @Autowired
    lateinit var meterDataService: MeterDataService

    /**
     * Export meter data as JSON for a sensor.
     */
    @GetMapping("/export/json/{sensorId}")
    fun exportJson(@PathVariable sensorId: String): ResponseEntity<List<Map<String, Any>>> {
        // Get data from MeterDataService
        val data = meterDataService.getMeterData(sensorId)

        // Format as required in the specification
        val result = listOf(data)

        return ResponseEntity.ok(result)
    }

    /**
     * Export meter data as CSV for a sensor.
     */
    @GetMapping("/export/csv/{sensorId}")
    fun exportCsv(@PathVariable sensorId: String): ResponseEntity<String> {
        // Get data from MeterDataService
        val data = meterDataService.getMeterData(sensorId)

        // Extract data
        @Suppress("UNCHECKED_CAST")
        val measurements = data["data"] as List<Map<String, Any>>

        // Build CSV content
        val csvBuilder = StringBuilder()
        csvBuilder.append("timestamp,value\n")

        measurements.forEach { entry ->
            csvBuilder.append("${entry["ts"]},${entry["value"]}\n")
        }

        // Set headers for CSV download
        val headers = HttpHeaders()
        headers.contentType = MediaType.parseMediaType("text/csv")
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"${sensorId}.csv\"")

        return ResponseEntity.ok()
            .headers(headers)
            .body(csvBuilder.toString())
    }
}
