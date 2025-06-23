package ch.com.electrilog.datacontroller

import ch.com.electrilog.shared.service.MeterDataService
import kotlin.io.path.createTempFile
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

/**
 * Controller for handling meter data operations.
 * This controller provides endpoints for uploading, processing, and retrieving meter data.
 */
@RestController
class DataController {
    @Autowired
    lateinit var meterDataService: MeterDataService

    /**
     * Upload and process SDAT files.
     */
    @PostMapping(
        "/data/upload/sdat",
        produces = [MediaType.APPLICATION_JSON_VALUE],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
    )
    fun uploadSdat(@RequestParam("file") files: List<MultipartFile>): ResponseEntity<String> {
        val tempFiles = files.map { multipartFile ->
            val tempFile = createTempFile().toFile()
            multipartFile.transferTo(tempFile)
            tempFile
        }

        val processedCount = meterDataService.processSdatFiles(tempFiles)

        // Clean up temp files
        tempFiles.forEach { it.delete() }

        return ResponseEntity.ok("Processed $processedCount SDAT files successfully")
    }

    /**
     * Upload and process ESL files.
     */
    @PostMapping(
        "/data/upload/esl",
        produces = [MediaType.APPLICATION_JSON_VALUE],
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
    )
    fun uploadEsl(@RequestParam("file") files: List<MultipartFile>): ResponseEntity<String> {
        val tempFiles = files.map { multipartFile ->
            val tempFile = createTempFile().toFile()
            multipartFile.transferTo(tempFile)
            tempFile
        }

        val processedCount = meterDataService.processEslFiles(tempFiles)

        // Clean up temp files
        tempFiles.forEach { it.delete() }

        return ResponseEntity.ok("Processed $processedCount ESL files successfully")
    }

    /**
     * Calculate meter readings from consumption data.
     */
    @GetMapping("/data/calculate")
    fun calculateConsumptionToMeter(@RequestParam(required = false) sensorId: String?): ResponseEntity<String> {
        val processedSensors = meterDataService.calculateConsumptionToMeter(sensorId)

        return ResponseEntity.ok("Calculated meter readings from consumption data for ${processedSensors.joinToString(", ")}")
    }

    /**
     * Get consumption data for a sensor.
     */
    @GetMapping("/data/consumption/{sensorId}")
    fun getConsumptionData(@PathVariable sensorId: String): ResponseEntity<Map<String, Any>> {
        val data = meterDataService.getConsumptionData(sensorId)
        return ResponseEntity.ok(data)
    }

    /**
     * Get meter data for a sensor.
     */
    @GetMapping("/data/meter/{sensorId}")
    fun getMeterData(@PathVariable sensorId: String): ResponseEntity<Map<String, Any>> {
        val data = meterDataService.getMeterData(sensorId)
        return ResponseEntity.ok(data)
    }
}
