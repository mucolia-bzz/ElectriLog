import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty

data class EslEntity(
	@JacksonXmlProperty(localName = "Header")
	val header: Header,

	@JacksonXmlProperty(localName = "Meter")
	val meter: Meter,
)

data class Header(
	@JacksonXmlProperty(isAttribute = true, localName = "version")
	val version: String,

	@JacksonXmlProperty(isAttribute = true, localName = "created")
	val created: String,

	@JacksonXmlProperty(isAttribute = true, localName = "swSystemNameFrom")
	val swSystemNameFrom: String,

	@JacksonXmlProperty(isAttribute = true, localName = "swSystemNameTo")
	val swSystemNameTo: String,
)

data class Meter(
	@JacksonXmlProperty(isAttribute = true, localName = "factoryNo")
	val factoryNo: String,

	@JacksonXmlProperty(isAttribute = true, localName = "internalNo")
	val internalNo: String,

	@JacksonXmlProperty(localName = "TimePeriod")
	val timePeriod: TimePeriod,
)

data class TimePeriod(
	@JacksonXmlProperty(isAttribute = true, localName = "end")
	val end: String,

	@JacksonXmlElementWrapper(useWrapping = false)
	@JacksonXmlProperty(localName = "ValueRow")
	val valueRows: List<ValueRow>,
)

data class ValueRow(
	@JacksonXmlProperty(isAttribute = true, localName = "obis")
	val obis: String,

	@JacksonXmlProperty(isAttribute = true, localName = "valueTimeStamp")
	val valueTimeStamp: String? = null,

	@JacksonXmlProperty(isAttribute = true, localName = "value")
	val value: String,

	@JacksonXmlProperty(isAttribute = true, localName = "status")
	val status: String,
)
