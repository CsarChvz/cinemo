# ============================================
# Etapa 1: Build (Compilación)
# ============================================
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos todo el código fuente
COPY . .

# Compilamos saltando los tests (ya corregido sin el '1')
RUN mvn clean package -DskipTests

# ============================================
# Etapa 2: Runtime (Ejecución)
# ============================================
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copiamos el .jar que se generó en la Etapa 1
COPY --from=build /app/target/*.jar api.jar

# Exponemos el puerto de Spring Boot
EXPOSE 8080

# ¡ESTA ES LA LÍNEA MÁGICA QUE TE FALTABA!
# Le dice a Docker exactamente cómo arrancar tu aplicación
ENTRYPOINT ["java", "-jar", "api.jar"]