package ch.com.electrilog.shared.utility

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.dataformat.xml.XmlMapper
import java.io.File
import org.springframework.stereotype.Component

@Component
class FileProcesser {
	private val xmlMapper = XmlMapper().apply {
		configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
	}

	fun <T> processXMLFile(file: File, entity: Class<T>): T? {
		return try {
			xmlMapper.readValue(file, entity)
		} catch (e: Exception) {
			e.printStackTrace()
			null
		}
	}
}
