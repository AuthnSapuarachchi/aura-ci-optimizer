# ADR 001: Backend Choice - Spring Boot

* **Date:** 2025-11-17
* **Status:** Accepted

## Context
We need to build a robust, scalable, and professional backend API for the Aura project. The choice is between Node.js (a modern, fast-prototyping stack) and Spring Boot (an enterprise-grade, robust stack). The goal is to build a strong "Enterprise Engineer" portfolio project.

## Decision
We will use **Spring Boot (Java)** for the backend API.

## Consequences
This decision has several clear trade-offs:

### Pros:
* **Enterprise Standard:** Spring Boot is the industry standard for large, corporate applications (banks, insurance, etc.). This strongly aligns with the "Enterprise Engineer" goal.
* **Robust & Type-Safe:** Java is a strongly typed language, which reduces runtime errors and makes the large project more stable and maintainable.
* **Powerful Ecosystem:** We gain access to the mature Spring ecosystem, including Spring Security (for authentication) and Spring Data (for database access), which are powerful and professional.

### Cons:
* **Language Context Switching:** The project will now use three different languages (React for JavaScript, Spring Boot for Java, and the ML Service for Python). This adds complexity.
* **Steeper Learning Curve:** Spring Boot is a massive framework and is more complex to set up and configure than a simple Node.js/Express server.
* **More Verbose:** Java code is generally more "verbose" (requires more lines of code) than JavaScript, which can slow down initial development.
