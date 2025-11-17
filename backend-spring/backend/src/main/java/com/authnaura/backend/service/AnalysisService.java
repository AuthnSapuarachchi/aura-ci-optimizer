package com.authnaura.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class AnalysisService {

    // This is a "record", a simple data-holder class
    // It must match the JSON from Python *exactly*
    public record PythonAnalysisResult(String parsedStatus, int parsedDurationSeconds) {}

    private final RestTemplate restTemplate;
    private final String mlServiceUrl;

    @Autowired
    public AnalysisService(RestTemplate restTemplate,
                           @Value("${ml.service.url}") String mlServiceUrl) {
        this.restTemplate = restTemplate;
        this.mlServiceUrl = mlServiceUrl;
    }

    // Change the return type from String to our new record
    public PythonAnalysisResult analyzeLog(String logText) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        HttpEntity<String> request = new HttpEntity<>(logText, headers);

        // This is the new part!
        // We ask RestTemplate to convert the JSON response
        // directly into our new Java object.
        PythonAnalysisResult analysisResult = restTemplate.postForObject(
                mlServiceUrl,
                request,
                PythonAnalysisResult.class // <-- Changed from String.class
        );

        return analysisResult;
    }

}
