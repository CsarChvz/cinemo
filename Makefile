SHELL := /bin/bash

# Cargar variables desde el .env si existe
ifneq (,$(wildcard .env))
include .env
export
endif

.PHONY: help build-api build-app build-all up up-build down logs clean-db

help:
	@echo "Comandos disponibles: build-api, build-app, build-all, up, up-build, down, logs, clean-db"

# ==========================================
# 🐳 CONSTRUCCIÓN DE IMÁGENES (Por separado)
# ==========================================

build-api:
	@echo "Construyendo la imagen de la API (Spring Boot)..."
	docker compose build api

build-app:
	@echo "Construyendo la imagen de la APP (Next.js)..."
	docker compose build app

# ==========================================
# 🚀 CONSTRUCCIÓN Y EJECUCIÓN (Todo junto)
# ==========================================

build-all:
	@echo "Construyendo todas las imágenes definidas en el compose..."
	docker compose build

up:
	@echo "Levantando el entorno local (Background)..."
	docker compose up -d

up-build:
	@echo "Forzando construcción y levantando el entorno local..."
	docker compose up --build

# ==========================================
# 🛠️ UTILIDADES DE DESARROLLO
# ==========================================

down:
	@echo "Deteniendo y eliminando los contenedores y redes..."
	docker compose down

logs:
	@echo "Mostrando logs en tiempo real (Ctrl+C para salir)..."
	docker compose logs -f

logs-api:
	docker compose logs -f api

logs-app:
	docker compose logs -f app

clean-db:
	@echo "Eliminando contenedores y destruyendo el volumen de la BD (Reset total)..."
	docker compose down -v