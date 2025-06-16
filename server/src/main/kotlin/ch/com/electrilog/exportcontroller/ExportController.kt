package ch.com.electrilog.exportcontroller

import ch.com.electrilog.uploadcontroller.UploadController
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class ExportController {
	@Autowired
	lateinit var objectMapper: ObjectMapper

	@Autowired
	lateinit var uploadController: UploadController

	@GetMapping("/export/json/{sensorId}")
	fun exportJson(@PathVariable sensorId: String): ResponseEntity<List<Map<String, Any>>> {
		// Get data from UploadController
		val response = uploadController.getMeterData(sensorId)
		val body = response.body ?: mapOf("sensorId" to sensorId, "data" to emptyList<Map<String, Any>>())

		// Format as required in the specification
		val result = listOf(body)

		return ResponseEntity.ok(result)
	}

	@GetMapping("/export/csv/{sensorId}")
	fun exportCsv(@PathVariable sensorId: String): ResponseEntity<String> {
		// Get data from UploadController
		val response = uploadController.getMeterData(sensorId)
		val body = response.body ?: mapOf("sensorId" to sensorId, "data" to emptyList<Map<String, Any>>())

		// Extract data
		@Suppress("UNCHECKED_CAST")
		val data = body["data"] as List<Map<String, Any>>

		// Build CSV content
		val csvBuilder = StringBuilder()
		csvBuilder.append("timestamp,value\n")

		data.forEach { entry ->
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
