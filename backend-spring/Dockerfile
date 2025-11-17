# --- Build Stage ---
FROM maven:3.9.6-eclipse-temurin-17-focal AS build

WORKDIR /app

# Copy the wrapper and pom.xml from the nested 'backend' folder
COPY backend/.mvn/ .mvn
COPY backend/mvnw backend/pom.xml ./

# Download all dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code from the nested 'backend' folder
COPY backend/src ./src

# Build the final .jar file
RUN ./mvnw clean package -DskipTests


# --- Final Stage ---
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Copy the .jar file we built in the "build" stage
COPY --from=build /app/target/backend.jar .

EXPOSE 10000
CMD ["java", "-jar", "backend.jar", "--server.port=${PORT}"]