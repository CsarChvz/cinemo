SHELL := /bin/bash

# Cargar variables desde el .env si existe
ifneq (,$(wildcard .env))
include .env
export
endif

# Configuración de rutas para ejecución nativa
API_DIR := ./api
APP_DIR := ./app

# Perfil de Docker Compose
DOCKER_PROFILE := --profile fullstack

.PHONY: help build-api build-app build-all up up-db up-full down logs logs-api logs-app clean-db install run-api run-app run-all stop-all

help:
	@echo "Comandos disponibles:"
	@echo "  -------------------------------------------------------"
	@echo "  🐳 DOCKER (Contenedores)"
	@echo "  -------------------------------------------------------"
	@echo "  up-db        : Levanta solo la base de datos (Postgres)"
	@echo "  up-full      : Levanta todo el stack (DB + API + APP)"
	@echo "  build-all    : Construye imágenes con perfil fullstack"
	@echo "  down         : Detiene y elimina contenedores y redes"
	@echo "  -------------------------------------------------------"
	@echo "  💻 NATIVO (Sin Docker - requiere up-db corriendo)"
	@echo "  -------------------------------------------------------"
	@echo "  install      : Instala dependencias (Maven y NPM)"
	@echo "  run-api      : Corre Spring Boot nativo"
	@echo "  run-app      : Corre Next.js nativo"
	@echo "  -------------------------------------------------------"
	@echo "  🛠️  UTILIDADES"
	@echo "  -------------------------------------------------------"
	@echo "  logs         : Ver logs de todo el stack"
	@echo "  clean-db     : Borra contenedores y VOLÚMENES (Hard reset)"

# ==========================================
# 🐳 SECCIÓN DOCKER
# ==========================================

build-api:
	@echo "Construyendo la imagen de la API..."
	docker compose $(DOCKER_PROFILE) build api

build-app:
	@echo "Construyendo la imagen de la APP..."
	docker compose $(DOCKER_PROFILE) build app

build-all:
	@echo "Construyendo todo el stack..."
	docker compose $(DOCKER_PROFILE) build

up-db:
	@echo "Levantando solo Postgres..."
	docker compose up -d postgres

up-full:
	@echo "Levantando Fullstack (Postgres, API, APP)..."
	docker compose $(DOCKER_PROFILE) up

down:
	@echo "Deteniendo contenedores..."
	docker compose $(DOCKER_PROFILE) down

logs:
	docker compose $(DOCKER_PROFILE) logs -f

logs-api:
	docker compose logs -f api

logs-app:
	docker compose logs -f app

clean-db:
	@echo "⚠️  Reseteando base de datos y borrando volúmenes..."
	docker compose $(DOCKER_PROFILE) down -v

# ==========================================
# 💻 SECCIÓN NATIVA
# ==========================================

PID_API := .api.pid
PID_APP := .app.pid

install:
	@echo "📦 Instalando dependencias..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw clean install -DskipTests; else mvn clean install -DskipTests; fi
	cd $(APP_DIR) && npm install

run-api:
	@echo "🚀 Iniciando API (Nativo)..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi

run-app:
	@echo "🚀 Iniciando APP (Nativo)..."
	cd $(APP_DIR) && npm run dev

run-all:
	@echo "🚦 Iniciando servicios nativos en background..."
	@cd $(API_DIR) && (if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi) > /dev/null 2>&1 & echo $$! > $(PID_API)
	@cd $(APP_DIR) && npm run dev > /dev/null 2>&1 & echo $$! > $(PID_APP)
	@echo "✅ API y APP corriendo nativamente."

stop-all:
	@echo "🛑 Deteniendo procesos nativos..."
	@if [ -f $(PID_API) ]; then kill $$(cat $(PID_API)) || true; rm $(PID_API); fi
	@if [ -f $(PID_APP) ]; then kill $$(cat $(PID_APP)) || true; rm $(PID_APP); fi