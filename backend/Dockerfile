# Etapa de build
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa de produção
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
# Copy the built jar from the builder stage. If the artifact has a classifier or
# versioned name, this will copy the first jar found in target and rename to app.jar
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# Allow passing JVM options via the JAVA_OPTS environment variable.
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]