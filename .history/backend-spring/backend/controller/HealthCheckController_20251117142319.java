package com.authnaura.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthCheckController {
    @GetMapping
    public Map<String, String> checkHealth() {
        // Create a simple response object
        Map<String, String> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "Aura Backend is running!");

        // Spring Boot automatically converts this Java Map into JSON
        return response;
    }
}
