import com.fasterxml.jackson.annotation.*
import com.fasterxml.jackson.dataformat.xml.annotation.*

@JacksonXmlRootElement(localName = "ValidatedMeteredData_12", namespace = "http://www.strom.ch")
data class ValidatedMeteredData(
	@JacksonXmlProperty(localName = "ValidatedMeteredData_HeaderInformation", namespace = "http://www.strom.ch")
	val headerInformation: HeaderInformation? = null,

	@JacksonXmlProperty(localName = "MeteringData", namespace = "http://www.strom.ch")
	val meteringData: MeteringData? = null,
)

data class HeaderInformation(
	@JacksonXmlProperty(localName = "HeaderVersion", namespace = "http://www.strom.ch")
	val headerVersion: String? = null,

	@JacksonXmlProperty(localName = "Sender", namespace = "http://www.strom.ch")
	val sender: Party? = null,

	@JacksonXmlProperty(localName = "Receiver", namespace = "http://www.strom.ch")
	val receiver: Party? = null,

	@JacksonXmlProperty(localName = "InstanceDocument", namespace = "http://www.strom.ch")
	val instanceDocument: InstanceDocument? = null,

	@JacksonXmlProperty(localName = "BusinessScopeProcess", namespace = "http://www.strom.ch")
	val businessScopeProcess: BusinessScopeProcess? = null,
)

data class Party(
	@JacksonXmlProperty(localName = "ID", namespace = "http://www.strom.ch")
	val id: EicIDWrapper? = null,

	@JacksonXmlProperty(localName = "Role", namespace = "http://www.strom.ch")
	val role: String? = null,
)

data class EicIDWrapper(
	@JacksonXmlProperty(localName = "EICID", namespace = "http://www.strom.ch")
	val eicid: String? = null,
)

data class InstanceDocument(
	@JacksonXmlProperty(localName = "DictionaryAgencyID", namespace = "http://www.strom.ch")
	val dictionaryAgencyID: String? = null,

	@JacksonXmlProperty(localName = "VersionID", namespace = "http://www.strom.ch")
	val versionID: String? = null,

	@JacksonXmlProperty(localName = "DocumentID", namespace = "http://www.strom.ch")
	val documentID: String? = null,

	@JacksonXmlProperty(localName = "DocumentType", namespace = "http://www.strom.ch")
	val documentType: DocumentType? = null,

	@JacksonXmlProperty(localName = "Creation", namespace = "http://www.strom.ch")
	val creation: String? = null,

	@JacksonXmlProperty(localName = "Status", namespace = "http://www.strom.ch")
	val status: String? = null,
)

data class DocumentType(
	@JacksonXmlProperty(localName = "ebIXCode", namespace = "http://www.strom.ch")
	val ebixCode: String? = null,
)

data class BusinessScopeProcess(
	@JacksonXmlProperty(localName = "BusinessReasonType", namespace = "http://www.strom.ch")
	val businessReasonType: BusinessReasonType? = null,

	@JacksonXmlProperty(localName = "BusinessDomainType", namespace = "http://www.strom.ch")
	val businessDomainType: String? = null,

	@JacksonXmlProperty(localName = "BusinessSectorType", namespace = "http://www.strom.ch")
	val businessSectorType: String? = null,

	@JacksonXmlProperty(localName = "ReportPeriod", namespace = "http://www.strom.ch")
	val reportPeriod: ReportPeriod? = null,
)

data class BusinessReasonType(
	@JacksonXmlProperty(localName = "ebIXCode", namespace = "http://www.strom.ch")
	val ebixCode: String? = null,
)

data class ReportPeriod(
	@JacksonXmlProperty(localName = "StartDateTime", namespace = "http://www.strom.ch")
	val startDateTime: String? = null,

	@JacksonXmlProperty(localName = "EndDateTime", namespace = "http://www.strom.ch")
	val endDateTime: String? = null,
)

data class MeteringData(
	@JacksonXmlProperty(localName = "DocumentID", namespace = "http://www.strom.ch")
	val documentID: String? = null,

	@JacksonXmlProperty(localName = "Interval", namespace = "http://www.strom.ch")
	val interval: Interval? = null,

	@JacksonXmlProperty(localName = "Resolution", namespace = "http://www.strom.ch")
	val resolution: Resolution? = null,

	@JacksonXmlProperty(localName = "ConsumptionMeteringPoint", namespace = "http://www.strom.ch")
	val meteringPoint: MeteringPoint? = null,

	@JacksonXmlProperty(localName = "Product", namespace = "http://www.strom.ch")
	val product: Product? = null,

	@JacksonXmlElementWrapper(useWrapping = false)
	@JacksonXmlProperty(localName = "Observation", namespace = "http://www.strom.ch")
	val observations: List<Observation>? = null,
)

data class Interval(
	@JacksonXmlProperty(localName = "StartDateTime", namespace = "http://www.strom.ch")
	val startDateTime: String? = null,

	@JacksonXmlProperty(localName = "EndDateTime", namespace = "http://www.strom.ch")
	val endDateTime: String? = null,
)

data class Resolution(
	@JacksonXmlProperty(localName = "Resolution", namespace = "http://www.strom.ch")
	val resolution: String? = null,

	@JacksonXmlProperty(localName = "Unit", namespace = "http://www.strom.ch")
	val unit: String? = null,
)

data class MeteringPoint(
	@JacksonXmlProperty(localName = "VSENationalID", namespace = "http://www.strom.ch")
	val vseId: String? = null,
)

data class Product(
	@JacksonXmlProperty(localName = "ID", namespace = "http://www.strom.ch")
	val id: String? = null,

	@JacksonXmlProperty(localName = "MeasureUnit", namespace = "http://www.strom.ch")
	val unit: String? = null,
)

data class Observation(
	@JacksonXmlProperty(localName = "Position", namespace = "http://www.strom.ch")
	val position: Position? = null,

	@JacksonXmlProperty(localName = "Volume", namespace = "http://www.strom.ch")
	val volume: Double? = null,
)

data class Position(
	@JacksonXmlProperty(localName = "Sequence", namespace = "http://www.strom.ch")
	val sequence: Int? = null,
)
