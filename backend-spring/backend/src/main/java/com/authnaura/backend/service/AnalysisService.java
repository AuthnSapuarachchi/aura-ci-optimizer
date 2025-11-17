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

    private final RestTemplate restTemplate;
    private final String mlServiceUrl;

    @Autowired
    public AnalysisService(RestTemplate restTemplate,
                           @Value("${ml.service.url}") String mlServiceUrl) {
        this.restTemplate = restTemplate;
        this.mlServiceUrl = mlServiceUrl;
    }

    public String analyzeLog(String logText) {
        // Set the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);

        // Create the request object
        HttpEntity<String> request = new HttpEntity<>(logText, headers);

        // Make the POST call to the Python service
        // We expect the response to be a String (the JSON)
        String analysisJson = restTemplate.postForObject(
                mlServiceUrl,
                request,
                String.class
        );

        return analysisJson;
    }

}
