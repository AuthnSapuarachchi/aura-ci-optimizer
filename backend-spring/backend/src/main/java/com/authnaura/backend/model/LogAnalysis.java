package com.authnaura.backend.model; // (Make sure your package name is correct)

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor // <-- REQUIRED for reading from DB
@Document(collection = "log_analyses")
public class LogAnalysis {

    @Id
    private String id;

    private String projectId;
    private Instant uploadedAt;
    private String rawLogText;

    // The data from our Python service
    private String parsedStatus;
    private int parsedDurationSeconds;

    @Field("user_id")
    private String userId;

    // This is the *only* other constructor we need.
    // This is the one our code uses in the Controller to CREATE new logs.
    public LogAnalysis(String projectId, String rawLogText, String parsedStatus, int parsedDurationSeconds, String userId) {
        this.projectId = projectId;
        this.rawLogText = rawLogText;
        this.parsedStatus = parsedStatus;
        this.parsedDurationSeconds = parsedDurationSeconds;
        this.uploadedAt = Instant.now();
        this.userId = userId;
    }
}