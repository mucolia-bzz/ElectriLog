package ch.com.electrilog.uploadcontroller

import EslEntity
import SdatEntity
import ch.com.electrilog.shared.model.Messwert
import ch.com.electrilog.shared.model.MesswertType
import ch.com.electrilog.shared.utility.FileProcesser
import java.util.TreeMap
import kotlin.io.path.createTempFile
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
class UploadController {
	@Autowired
	lateinit var fileProcesser: FileProcesser

	// Store processed data in memory for simplicity
	// In a real application, this would be stored in a database
	private val sdatData = mutableListOf<SdatEntity>()
	private val eslData = mutableListOf<EslEntity>()

	// Store measurement data using the Messwert model
	// Using package-private visibility to allow access from ExportController
	val consumptionData = mutableMapOf<String, TreeMap<Long, Messwert>>() // sensorId -> (timestamp -> Messwert)
	val meterData = mutableMapOf<String, TreeMap<Long, Messwert>>() // sensorId -> (timestamp -> Messwert)

	@PostMapping(
		"/upload/sdat",
		produces = [MediaType.APPLICATION_JSON_VALUE],
		consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
	)
	fun uploadSdat(@RequestParam("file") files: List<MultipartFile>): ResponseEntity<String> {
		val results = files.mapNotNull { multipartFile ->
			val tempFile = createTempFile().toFile()
			multipartFile.transferTo(tempFile)
			val result = fileProcesser.processXMLFile(file = tempFile, entity = SdatEntity::class.java)
			tempFile.delete()
			result
		}

		// Remove duplicates and add to stored data
		val uniqueResults = results.toSet().toList()
		sdatData.addAll(uniqueResults)

		// Process and store consumption data
		uniqueResults.forEach { sdatEntity ->
			sdatEntity?.meteringData?.let { meteringData ->
				val documentId = meteringData.documentID ?: return@let
				val sensorId = when {
					documentId.contains("ID735") -> "ID735" // Einspeisung
					documentId.contains("ID742") -> "ID742" // Bezug
					else -> return@let
				}

				// Get or create TreeMap for this sensor
				val sensorData = consumptionData.getOrPut(sensorId) { TreeMap() }

				// Process observations
				meteringData.observations?.forEach { observation ->
					val startDateTime = meteringData.interval?.startDateTime ?: return@forEach
					val timestamp = parseTimestamp(startDateTime)
					val volume = observation.volume ?: return@forEach

					// Store data as Messwert object (overwrite if duplicate timestamp)
					sensorData[timestamp] = Messwert(timestamp, volume, MesswertType.RELATIV)
				}
			}
		}

		return ResponseEntity.ok("Processed ${uniqueResults.size} SDAT files successfully")
	}

	@PostMapping(
		"/upload/esl",
		produces = [MediaType.APPLICATION_JSON_VALUE],
		consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
	)
	fun uploadEsl(@RequestParam("file") files: List<MultipartFile>): ResponseEntity<String> {
		val results = files.mapNotNull { multipartFile ->
			val tempFile = createTempFile().toFile()
			multipartFile.transferTo(tempFile)
			val result = fileProcesser.processXMLFile(file = tempFile, entity = EslEntity::class.java)
			tempFile.delete()
			result
		}

		// Remove duplicates and add to stored data
		val uniqueResults = results.toSet().toList()
		eslData.addAll(uniqueResults)

		// Process and store meter data
		uniqueResults.forEach { eslEntity ->
			eslEntity?.meters?.forEach { meter ->
				meter.timePeriod?.valueRows?.forEach { valueRow ->
					val obisCode = valueRow.obis ?: return@forEach
					val value = valueRow.value?.toDoubleOrNull() ?: return@forEach
					val timestamp = parseTimestamp(valueRow.valueTimeStamp ?: return@forEach)

					// Map OBIS code to sensor ID
					val sensorId = when {
						obisCode.startsWith("1-1:1.8") -> "ID742" // Bezug
						obisCode.startsWith("1-1:2.8") -> "ID735" // Einspeisung
						else -> return@forEach
					}

					// Get or create TreeMap for this sensor
					val sensorData = meterData.getOrPut(sensorId) { TreeMap() }

					// Store data as Messwert object (overwrite if duplicate timestamp)
					sensorData[timestamp] = Messwert(timestamp, value, MesswertType.ABSOLUT)
				}
			}
		}

		return ResponseEntity.ok("Processed ${uniqueResults.size} ESL files successfully")
	}

	@GetMapping("/calculate/upload-consumption-to-meter")
	fun calculateConsumptionToMeter(@RequestParam(required = false) sensorId: String?): ResponseEntity<String> {
		// If sensorId is provided, only calculate for that sensor
		val sensorsToProcess = sensorId?.let { listOf(it) } ?: listOf("ID735", "ID742")

		sensorsToProcess.forEach { id ->
			val consumption = consumptionData[id] ?: return@forEach
			val meter = meterData[id] ?: return@forEach

			// Create a new TreeMap for calculated meter readings
			val calculatedMeter = TreeMap<Long, Messwert>()

			// Find the earliest meter reading to use as a starting point
			val earliestMeterEntry = meter.entries.firstOrNull() ?: return@forEach
			var currentMeterValue = earliestMeterEntry.value.value
			var currentTimestamp = earliestMeterEntry.key

			calculatedMeter[currentTimestamp] = Messwert(currentTimestamp, currentMeterValue, MesswertType.ABSOLUT)

			// Process consumption values chronologically
			consumption.entries.forEach { (timestamp, messwert) ->
				if (timestamp > currentTimestamp) {
					// Add consumption to current meter value
					currentMeterValue += messwert.value
					calculatedMeter[timestamp] = Messwert(timestamp, currentMeterValue, MesswertType.ABSOLUT)
					currentTimestamp = timestamp
				}
			}

			// Store calculated meter readings
			meterData[id] = calculatedMeter
		}

		return ResponseEntity.ok("Calculated meter readings from consumption data for ${sensorsToProcess.joinToString(", ")}")
	}

	@GetMapping("/data/consumption/{sensorId}")
	fun getConsumptionData(@PathVariable sensorId: String): ResponseEntity<Map<String, Any>> {
		val data = consumptionData[sensorId]?.map { (timestamp, messwert) ->
			mapOf("ts" to timestamp.toString(), "value" to messwert.value)
		} ?: emptyList()

		return ResponseEntity.ok(
			mapOf(
				"sensorId" to sensorId,
				"data" to data,
			),
		)
	}

	@GetMapping("/data/meter/{sensorId}")
	fun getMeterData(@PathVariable sensorId: String): ResponseEntity<Map<String, Any>> {
		val data = meterData[sensorId]?.map { (timestamp, messwert) ->
			mapOf("ts" to timestamp.toString(), "value" to messwert.value)
		} ?: emptyList()

		return ResponseEntity.ok(
			mapOf(
				"sensorId" to sensorId,
				"data" to data,
			),
		)
	}

	// Helper function to parse timestamp from ISO format to Unix timestamp
	private fun parseTimestamp(isoTimestamp: String): Long {
		return try {
			// Remove Z suffix and convert to milliseconds
			val timestamp = isoTimestamp.replace("Z", "")
			java.time.Instant.parse("${timestamp}Z").epochSecond
		} catch (e: Exception) {
			// Fallback to current time if parsing fails
			System.currentTimeMillis() / 1000
		}
	}
}
