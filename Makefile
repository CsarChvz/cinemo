SHELL := /bin/bash

# Cargar variables desde el .env si existe
ifneq (,$(wildcard .env))
include .env
export
endif

# Configuración de rutas para ejecución nativa
API_DIR := ./api
APP_DIR := ./app

.PHONY: help build-api build-app build-all up up-build down logs logs-api logs-app clean-db install run-api run-app run-all stop-all

help:
	@echo "Comandos disponibles:"
	@echo "  -------------------------------------------------------"
	@echo "  🐳 DOCKER (Contenedores)"
	@echo "  -------------------------------------------------------"
	@echo "  build-all    : Construye todas las imágenes de Docker"
	@echo "  up           : Levanta el entorno en Docker (Background)"
	@echo "  down         : Detiene y elimina contenedores Docker"
	@echo "  -------------------------------------------------------"
	@echo "  💻 NATIVO (Sin Docker - en /api y /app)"
	@echo "  -------------------------------------------------------"
	@echo "  install      : Instala dependencias (Maven y NPM)"
	@echo "  run-api      : Corre Spring Boot (mvn spring-boot:run)"
	@echo "  run-app      : Corre Next.js (npm run dev)"
	@echo "  run-all      : Lanza ambos en segundo plano"
	@echo "  stop-all     : Detiene los procesos nativos de run-all"
	@echo "  -------------------------------------------------------"
	@echo "  🛠️  UTILIDADES"
	@echo "  -------------------------------------------------------"
	@echo "  logs         : Ver logs de Docker"
	@echo "  clean-db     : Reset total de la base de datos en Docker"

# ==========================================
# 🐳 SECCIÓN DOCKER
# ==========================================

build-api:
	@echo "Construyendo la imagen de la API (Spring Boot)..."
	docker compose build api

build-app:
	@echo "Construyendo la imagen de la APP (Next.js)..."
	docker compose build app

build-all:
	@echo "Construyendo todas las imágenes..."
	docker compose build

up:
	@echo "Levantando el entorno local Docker..."
	docker compose up -d

up-build:
	@echo "Forzando build y levantando Docker..."
	docker compose up --build

down:
	@echo "Deteniendo contenedores..."
	docker compose down

logs:
	docker compose logs -f

logs-api:
	docker compose logs -f api

logs-app:
	docker compose logs -f app

clean-db:
	@echo "Reseteando base de datos Docker..."
	docker compose down -v

# ==========================================
# 💻 SECCIÓN NATIVA (SIN DOCKER)
# ==========================================

# Archivos temporales para PIDs
PID_API := .api.pid
PID_APP := .app.pid

install:
	@echo "📦 Instalando dependencias nativas..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw clean install -DskipTests; else mvn clean install -DskipTests; fi
	cd $(APP_DIR) && npm install

run-api:
	@echo "🚀 Iniciando API Spring Boot (Nativo)..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi

run-app:
	@echo "🚀 Iniciando APP Next.js (Nativo)..."
	cd $(APP_DIR) && npm run dev

run-all:
	@echo "🚦 Iniciando servicios nativos en background..."
	@# API
	@cd $(API_DIR) && (if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi) > /dev/null 2>&1 & echo $$! > $(PID_API)
	@# APP
	@cd $(APP_DIR) && npm run dev > /dev/null 2>&1 & echo $$! > $(PID_APP)
	@echo "✅ API y APP corriendo. Usa 'make stop-all' para apagar."

stop-all:
	@echo "🛑 Deteniendo procesos nativos..."
	@if [ -f $(PID_API) ]; then kill $$(cat $(PID_API)) || true; rm $(PID_API); fi
	@if [ -f $(PID_APP) ]; then kill $$(cat $(PID_APP)) || true; rm $(PID_APP); fi
	@echo "✅ Procesos terminados."