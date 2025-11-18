package com.authnaura.backend.controller;

import com.authnaura.backend.model.LogAnalysis;
import com.authnaura.backend.model.User;
import com.authnaura.backend.repository.LogAnalysisRepository;
import com.authnaura.backend.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<LogAnalysis> uploadLog(@RequestBody String logFileText, Authentication authentication) {

        System.out.println("=== Upload Log Endpoint ===");
        System.out.println("Authentication object: " + (authentication != null ? "Present" : "Null"));
        
        if (authentication == null) {
            System.out.println("ERROR: Authentication is null!");
            return ResponseEntity.status(403).build();
        }

        System.out.println("Authentication principal type: " + authentication.getPrincipal().getClass().getName());
        
        User currentUser = (User) authentication.getPrincipal();
        System.out.println("Current user: " + currentUser.getUsername());
        System.out.println("Log text length: " + logFileText.length());

        // 1. Get analysis from Python service
        PythonAnalysisResult analysis = analysisService.analyzeLog(logFileText);

        // 2. Create our complete data object
        // We'll hard-code a "projectId" for now
        LogAnalysis logToSave = new LogAnalysis(
                "mvp-project",       // hard-coded project ID
                logFileText,             // the raw log
                analysis.parsedStatus(), // the status from Python
                analysis.parsedDurationSeconds(), // the duration from Python
                currentUser.getId()
        );

        // 3. Save it to the database!
        LogAnalysis savedLog = logAnalysisRepository.save(logToSave);

        // 4. Return the *saved* object to the user
        // This includes the new ID and uploadedAt timestamp
        return ResponseEntity.ok(savedLog);
    }

    @GetMapping("/all")
    public ResponseEntity<List<LogAnalysis>> getAllLogs(Authentication authentication) {

        // 1. Get the currently logged-in user
        User currentUser = (User) authentication.getPrincipal();

        // This 'findAll' method is built-in from MongoRepository!
        // It fetches all documents from the collection.
        List<LogAnalysis> userLogs = logAnalysisRepository.findByUserId(currentUser.getId());

        // Return the full list as a JSON array
        return ResponseEntity.ok(userLogs);
    }

}
