package ch.com.electrilog.shared.utility

import ValidatedMeteredData
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.dataformat.xml.XmlMapper
import java.io.File
import org.springframework.stereotype.Component

@Component
class FileProcesser {
	private val xmlMapper = XmlMapper().apply {
		configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
	}

	fun processXMLFile(filePath: File): ValidatedMeteredData? {
		return try {
			xmlMapper.readValue(filePath, ValidatedMeteredData::class.java)
		} catch (e: Exception) {
			e.printStackTrace()
			null
		}
	}
}
