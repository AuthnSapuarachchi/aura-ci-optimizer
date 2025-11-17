# --- Build Stage ---
# Use an official "maven" image to build our app
# This image has Java and Maven pre-installed
FROM maven:3.9.6-eclipse-temurin-17-focal AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and mvnw wrapper first
# This is a trick to speed up builds. Docker will cache this layer.
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Download all dependencies
RUN ./mvnw dependency:go-offline

# Copy the rest of our source code
COPY src ./src

# Build the final .jar file
RUN ./mvnw clean package -DskipTests


# --- Final Stage ---
# Use a lightweight "Java 17" image to run our app
# This image is small and secure, perfect for production
FROM eclipse-temurin:17-jre-focal

# Set the working directory
WORKDIR /app

# Copy the .jar file we built in the "build" stage
COPY --from=build /app/target/backend.jar .

# Expose the port our app runs on (Render will use this)
EXPOSE 10000

# This is the command to start our app
# RENDER_PORT is an environment variable Render provides
CMD ["java", "-jar", "backend.jar", "--server.port=${PORT}"]