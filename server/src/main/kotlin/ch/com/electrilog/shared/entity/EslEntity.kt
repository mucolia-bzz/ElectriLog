import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty

data class EslEntity(
	@JacksonXmlProperty(localName = "Header")
	val header: Header? = null,

	@JacksonXmlElementWrapper(useWrapping = false)
	@JacksonXmlProperty(localName = "Meter")
	val meters: List<Meter>? = null,
)

data class Header(
	@JacksonXmlProperty(localName = "version", isAttribute = true)
	val version: String? = null,

	@JacksonXmlProperty(localName = "created", isAttribute = true)
	val created: String? = null,

	@JacksonXmlProperty(localName = "swSystemNameFrom", isAttribute = true)
	val swSystemNameFrom: String? = null,

	@JacksonXmlProperty(localName = "swSystemNameTo", isAttribute = true)
	val swSystemNameTo: String? = null,
)

data class Meter(
	@JacksonXmlProperty(localName = "factoryNo", isAttribute = true)
	val factoryNo: String? = null,

	@JacksonXmlProperty(localName = "internalNo", isAttribute = true)
	val internalNo: String? = null,

	@JacksonXmlProperty(localName = "TimePeriod")
	val timePeriod: TimePeriod? = null,
)

data class TimePeriod(
	@JacksonXmlProperty(isAttribute = true)
	val end: String? = null, // Maps the "end" attribute

	@JacksonXmlElementWrapper(useWrapping = false)
	@JacksonXmlProperty(localName = "ValueRow")
	val valueRows: List<ValueRow>? = null, // Maps the nested "ValueRow" elements
)

data class ValueRow(
	@JacksonXmlProperty(localName = "obis", isAttribute = true)
	val obis: String? = null,

	@JacksonXmlProperty(localName = "valueTimeStamp", isAttribute = true)
	val valueTimeStamp: String? = null,

	@JacksonXmlProperty(localName = "value", isAttribute = true)
	val value: String? = null,

	@JacksonXmlProperty(localName = "status", isAttribute = true)
	val status: String? = null,
)
