# Cambia esto:
FROM eclipse-temurin:21-jdk-jammy AS build
# Por esto:
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app
COPY . .
# Y quita el ./ y la 'w'
RUN mvn clean package -DskipTests