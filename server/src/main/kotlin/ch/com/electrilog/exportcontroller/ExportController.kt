package ch.com.electrilog.exportcontroller

import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/export")
class ExportController {
	@PostMapping("/json",
		produces = [MediaType.MULTIPART_FORM_DATA_VALUE],
		consumes = [MediaType.APPLICATION_JSON_VALUE])
	fun exportJson(@RequestBody json: String) {

	}
}
