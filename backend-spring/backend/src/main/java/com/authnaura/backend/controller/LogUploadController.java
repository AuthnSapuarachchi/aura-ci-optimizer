package com.authnaura.backend.controller;

import com.authnaura.backend.model.LogAnalysis;
import com.authnaura.backend.repository.LogAnalysisRepository;
import com.authnaura.backend.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.authnaura.backend.service.AnalysisService.PythonAnalysisResult; // Import our new record

import java.util.List;

@RestController
@RequestMapping("/api/v1/log")
public class LogUploadController {

    private final AnalysisService analysisService;
    private final LogAnalysisRepository logAnalysisRepository; // <-- Add this

    @Autowired
    public LogUploadController(AnalysisService analysisService,
                               LogAnalysisRepository logAnalysisRepository) {
        this.analysisService = analysisService;
        this.logAnalysisRepository = logAnalysisRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<LogAnalysis> uploadLog(@RequestBody String logFileText) {

        // 1. Get analysis from Python service
        PythonAnalysisResult analysis = analysisService.analyzeLog(logFileText);

        // 2. Create our complete data object
        // We'll hard-code a "projectId" for now
        LogAnalysis logToSave = new LogAnalysis(
                "mvp-project",       // hard-coded project ID
                logFileText,             // the raw log
                analysis.parsedStatus(), // the status from Python
                analysis.parsedDurationSeconds() // the duration from Python
        );

        // 3. Save it to the database!
        LogAnalysis savedLog = logAnalysisRepository.save(logToSave);


        // 4. Return the *saved* object to the user
        // This includes the new ID and uploadedAt timestamp
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping("/all")
    public ResponseEntity<List<LogAnalysis>> getAllLogs() {
        // This 'findAll' method is built-in from MongoRepository!
        // It fetches all documents from the collection.
        List<LogAnalysis> allLogs = logAnalysisRepository.findAll();

        // Return the full list as a JSON array
        return ResponseEntity.ok(allLogs);
    }

}
