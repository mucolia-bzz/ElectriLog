package ch.com.electrilog.shared.service

import ch.com.electrilog.shared.entity.EslEntity
import ch.com.electrilog.shared.entity.SdatEntity
import ch.com.electrilog.shared.model.Messwert
import ch.com.electrilog.shared.model.MesswertType
import ch.com.electrilog.shared.utility.FileProcesser
import java.io.File
import java.util.TreeMap
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

/**
 * Service for processing meter data from SDAT and ESL files.
 * This service centralizes the logic for processing and storing meter data.
 */
@Service
class MeterDataService {
    @Autowired
    lateinit var fileProcesser: FileProcesser

    // Store processed data in memory for simplicity
    // In a real application, this would be stored in a database
    private val sdatData = mutableListOf<SdatEntity>()
    private val eslData = mutableListOf<EslEntity>()

    // Store measurement data using the Messwert model
    val consumptionData = mutableMapOf<String, TreeMap<Long, Messwert>>() // sensorId -> (timestamp -> Messwert)
    val meterData = mutableMapOf<String, TreeMap<Long, Messwert>>() // sensorId -> (timestamp -> Messwert)

    /**
     * Process SDAT files and extract consumption data.
     *
     * @param files List of files to process
     * @return Number of unique files processed
     */
    fun processSdatFiles(files: List<File>): Int {
        val results = files.mapNotNull { file ->
            fileProcesser.processXMLFile(file = file, entity = SdatEntity::class.java)
        }

        // Remove duplicates and add to stored data
        val uniqueResults = results.toSet().toList()
        sdatData.addAll(uniqueResults)

        // Process and store consumption data
        uniqueResults.forEach { sdatEntity ->
            sdatEntity?.headerInformation?.instanceDocument?.documentID?.let { documentId ->
                val sensorId = when {
                    documentId.contains("ID735") -> "ID735" // Einspeisung
                    documentId.contains("ID742") -> "ID742" // Bezug
                    else -> return@let
                }

                sdatEntity.meteringData?.let { meteringData ->
                    // Get or create TreeMap for this sensor
                    val sensorData = consumptionData.getOrPut(sensorId) { TreeMap() }

                    // Process observations
                    meteringData.observations?.forEach { observation ->
                        val startDateTime = meteringData.interval?.startDateTime ?: return@forEach
                        val timestamp = parseTimestamp(startDateTime)
                        val volume = observation.volume ?: return@forEach

                        // Store data (overwrite if duplicate timestamp)
                        sensorData[timestamp] = Messwert(timestamp, volume, MesswertType.RELATIV)
                    }
                }
            }
        }

        return uniqueResults.size
    }

    /**
     * Process ESL files and extract meter data.
     *
     * @param files List of files to process
     * @return Number of unique files processed
     */
    fun processEslFiles(files: List<File>): Int {
        val results = files.mapNotNull { file ->
            fileProcesser.processXMLFile(file = file, entity = EslEntity::class.java)
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
                    val timestamp = parseTimestamp(valueRow.valueTimeStamp ?: meter.timePeriod.end ?: return@forEach)

                    // Map OBIS code to sensor ID
                    val sensorId = when {
                        obisCode.startsWith("1-1:1.8") -> "ID742" // Bezug
                        obisCode.startsWith("1-1:2.8") -> "ID735" // Einspeisung
                        else -> return@forEach
                    }

                    // Get or create TreeMap for this sensor
                    val sensorData = meterData.getOrPut(sensorId) { TreeMap() }

                    // Store data (overwrite if duplicate timestamp)
                    sensorData[timestamp] = Messwert(timestamp, value, MesswertType.ABSOLUT)
                }
            }
        }

        return uniqueResults.size
    }

    /**
     * Calculate meter readings from consumption data.
     *
     * @param sensorId Optional sensor ID to process only that sensor
     * @return List of sensor IDs that were processed
     */
    fun calculateConsumptionToMeter(sensorId: String? = null): List<String> {
        // If sensorId is provided, only calculate for that sensor
        val sensorsToProcess = sensorId?.let { listOf(it) } ?: listOf("ID735", "ID742")
        val processedSensors = mutableListOf<String>()

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
            processedSensors.add(id)
        }

        return processedSensors
    }

    /**
     * Get consumption data for a sensor.
     *
     * @param sensorId Sensor ID
     * @return Map with sensor ID and data
     */
    fun getConsumptionData(sensorId: String): Map<String, Any> {
        val data = consumptionData[sensorId]?.map { (timestamp, messwert) ->
            mapOf("ts" to timestamp.toString(), "value" to messwert.value)
        } ?: emptyList()

        return mapOf(
            "sensorId" to sensorId,
            "data" to data,
        )
    }

    /**
     * Get meter data for a sensor.
     *
     * @param sensorId Sensor ID
     * @return Map with sensor ID and data
     */
    fun getMeterData(sensorId: String): Map<String, Any> {
        val data = meterData[sensorId]?.map { (timestamp, messwert) ->
            mapOf("ts" to timestamp.toString(), "value" to messwert.value)
        } ?: emptyList()

        return mapOf(
            "sensorId" to sensorId,
            "data" to data,
        )
    }

    /**
     * Parse timestamp from ISO format to Unix timestamp.
     *
     * @param isoTimestamp ISO timestamp
     * @return Unix timestamp in seconds
     */
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
