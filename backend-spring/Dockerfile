# --- Build Stage ---
# Use an image that has Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build
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
# Use a Java 21 JRE to run the app
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the .jar file we built in the "build" stage
COPY --from=build /app/target/backend.jar .

EXPOSE 10000
CMD ["java", "-jar", "backend.jar", "--server.port=${PORT}"]
