# --- Build Stage ---
# Use an image that has Java 21 (instead of 17)
FROM maven:3.9.6-eclipse-temurin-21-focal AS build # <-- FIX #1
WORKDIR /app

# Copy the wrapper and pom.xml from the nested 'backend' folder
COPY backend/.mvn/ .mvn
COPY backend/mvnw backend/pom.xml ./

# Add execute permission to the Maven wrapper script
RUN chmod +x ./mvnw

# Download all dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code from the nested 'backend' folder
COPY backend/src ./src

# Build the final .jar file
RUN ./mvnw clean package -DskipTests


# --- Final Stage ---
# Use a Java 21 JRE (instead of 17) to run the app
FROM eclipse-temurin:21-jre-focal # <-- FIX #2
WORKDIR /app

# Copy the .jar file we built in the "build" stage
COPY --from=build /app/target/backend.jar .

EXPOSE 10000
CMD ["java", "-jar", "backend.jar", "--server.port=${PORT}"]
