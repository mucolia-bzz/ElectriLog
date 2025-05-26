package ch.com.electrilog.readcontroller

import ValidatedMeteredData
import ch.com.electrilog.shared.utility.FileProcesser
import java.io.File
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/parsing")
class ReadController {
	@Autowired
	lateinit var fileProcesser: FileProcesser

	@GetMapping("/read", produces = [MediaType.APPLICATION_JSON_VALUE])
	fun read(): ValidatedMeteredData? {
		val filePath = File("server/src/main/resources/Test.xml")
		return fileProcesser.processXMLFile(filePath)
	}
}
