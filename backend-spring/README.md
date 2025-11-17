# Aura Backend (Spring Boot)

This is the Java/Spring Boot API for the Aura project.

## Tech Stack
* Java 21
* Spring Boot
* Maven
* Spring Web (for REST APIs)
* Spring Data MongoDB (for database)

## How to Run Locally

1.  Set the database environment variable. (This is a secret and should not be saved in code.)
    ```bash
    # On macOS/Linux
    export MONGO_DB_URI="your-mongodb-connection-string"

    # On Windows (PowerShell)
    $env:MONGO_DB_URI = "your-mongodb-connection-string"

    * `MONGO_DB_URI`: Your MongoDB connection string.
    * `JWT_SECRET_KEY`: Your Base64-encoded JWT secret.
    ```
2.  `cd` into the `backend-spring` folder.
3.  Run `./mvnw spring-boot:run` (or `mvnw.cmd` on Windows).

## API Endpoints

* `GET /api/v1/health`: Checks if the server is running.
* `POST /api/v1/log/upload`: Uploads a raw log file as text for analysis.




