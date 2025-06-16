package ch.com.electrilog.shared.model

/**
 * Represents a measurement value with timestamp, value, and type.
 *
 * @property ts The timestamp of the measurement in Unix time (seconds since epoch)
 * @property value The measurement value
 * @property type The type of measurement (ABSOLUT for meter readings, RELATIV for consumption values)
 */
data class Messwert(
    val ts: Long,
    val value: Double,
    val type: MesswertType
)

/**
 * Enum representing the type of measurement.
 *
 * ABSOLUT: Absolute meter readings (from ESL files)
 * RELATIV: Relative consumption values (from SDAT files)
 */
enum class MesswertType {
    ABSOLUT,
    RELATIV
}
