# Aura Backend (Spring Boot)

This is the Java/Spring Boot API for the Aura project.

## Tech Stack
* Java 21
* Spring Boot
* Maven
* Spring Web (for REST APIs)
* Spring Data MongoDB (for database)

## How to Run Locally

1.  `cd` into the `backend-spring` folder.
2.  Run `./mvnw spring-boot:run` (or `mvnw.cmd` on Windows).
3.  The server will be live at `http://localhost:8080`.

## API Endpoints

* `GET /api/v1/health`: Checks if the server is running.
* `POST /api/v1/log/upload`: Uploads a raw log file as text for analysis.


