package com.authnaura.backend.controller;

import com.authnaura.backend.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/log")
public class LogUploadController {

    private final AnalysisService analysisService;

    @Autowired
    public LogUploadController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadLog(@RequestBody String logFileText) {

        // This is the full "vertical slice"!
        // 1. We get the raw text from the user (React)
        // 2. We pass it to our AnalysisService
        // 3. AnalysisService sends it to the Python service
        // 4. We get the JSON analysis back and return it

        String analysisJson = analysisService.analyzeLog(logFileText);

        // We return the raw JSON string from the Python service
        // We set the content type so the browser knows it's JSON
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(analysisJson);
    }
}
