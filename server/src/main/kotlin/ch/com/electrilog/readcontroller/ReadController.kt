package ch.com.electrilog.readcontroller

import EslEntity
import SdatEntity
import ch.com.electrilog.shared.utility.FileProcesser
import kotlin.io.path.createTempFile
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/parsing")
class ReadController {
	@Autowired
	lateinit var fileProcesser: FileProcesser

	// In ReadController.kt
	@PostMapping(
		"/read_sdat",
		produces = [MediaType.APPLICATION_JSON_VALUE],
		consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
	)
	fun read(@RequestParam("file") files: List<MultipartFile>): List<SdatEntity?> {
		val results = files.mapNotNull { multipartFile ->
			val tempFile = createTempFile().toFile()
			multipartFile.transferTo(tempFile)
			val result = fileProcesser.processXMLFile(file = tempFile, entity = SdatEntity::class.java)
			tempFile.delete()
			result
		}
		return results.toSet().toList() // Removes duplicates
	}

	@PostMapping(
		"/read_esl",
		produces = [MediaType.APPLICATION_JSON_VALUE],
		consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
	)
	fun readESLFile(@RequestParam("file") files: List<MultipartFile>): List<EslEntity?> {
		val results = files.mapNotNull { multipartFile ->
			val tempFile = createTempFile().toFile()
			multipartFile.transferTo(tempFile)
			val result = fileProcesser.processXMLFile(file = tempFile, entity = EslEntity::class.java)
			tempFile.delete()
			result
		}
		return results.toSet().toList() // Removes duplicates
	}
}
