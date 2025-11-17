package com.authnaura.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "log_analyses")
public class LogAnalysis {

    @Id
    private String id; // MongoDB will auto-generate this

    private String projectId; // So we can group logs by project later
    private Instant uploadedAt;
    private String rawLogText; // The original log

    // The data from our Python service
    private String parsedStatus;
    private int parsedDurationSeconds;

    // A constructor
    public LogAnalysis(String projectId, String rawLogText, String parsedStatus, int parsedDurationSeconds) {
        this.projectId = projectId;
        this.rawLogText = rawLogText;
        this.parsedStatus = parsedStatus;
        this.parsedDurationSeconds = parsedDurationSeconds;
        this.uploadedAt = Instant.now(); // Set the timestamp on creation
    }

}
