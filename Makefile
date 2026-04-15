SHELL := /bin/bash

# Cargar variables desde el .env si existe
ifneq (,$(wildcard .env))
include .env
export
endif

# ============================================
# CONFIGURACIÓN
# ============================================
API_DIR      := ./api
APP_DIR      := ./app
INFRA_DIR    := ./infra
DOCKER_PROFILE := --profile fullstack

# AWS (puedes sobreescribir con: make tf-apply AWS_PROFILE=mi-perfil)
AWS_PROFILE  ?= default
AWS_REGION   ?= us-east-1

.PHONY: help \
        build-api build-app build-all up-db up-full down logs logs-api logs-app clean-db \
        install run-api run-app run-all stop-all \
        tf-init tf-plan tf-apply tf-destroy tf-output \
        ecr-login docker-push deploy-api \
        sst-init sst-deploy sst-remove \
        deploy-all

# ============================================
# HELP
# ============================================
help:
	@echo ""
	@echo "╔══════════════════════════════════════════════════════╗"
	@echo "║               CINEMO - COMANDOS                      ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  🐳 DOCKER (desarrollo local)                        ║"
	@echo "║    up-db        Levanta solo Postgres                ║"
	@echo "║    up-full      Levanta DB + API + APP               ║"
	@echo "║    build-all    Construye todas las imágenes         ║"
	@echo "║    down         Detiene contenedores                 ║"
	@echo "║    clean-db     Borra contenedores y volúmenes       ║"
	@echo "║    logs         Ver logs del stack                   ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  💻 NATIVO (desarrollo local sin Docker)             ║"
	@echo "║    install      Instala dependencias                 ║"
	@echo "║    run-api      Corre Spring Boot nativo             ║"
	@echo "║    run-app      Corre Next.js nativo                 ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  🏗️  TERRAFORM (infraestructura AWS)                  ║"
	@echo "║    tf-init      Inicializa Terraform                 ║"
	@echo "║    tf-plan      Previsualiza cambios                 ║"
	@echo "║    tf-apply     Aplica infraestructura               ║"
	@echo "║    tf-destroy   Destruye infraestructura ⚠️           ║"
	@echo "║    tf-output    Muestra outputs (URLs, etc)          ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  🚀 DEPLOY API (ECR + ECS)                           ║"
	@echo "║    ecr-login    Login en ECR                         ║"
	@echo "║    docker-push  Build y push imagen al ECR           ║"
	@echo "║    deploy-api   Fuerza redeploy en ECS               ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  🌐 DEPLOY NEXT.JS (SST)                             ║"
	@echo "║    sst-init     Inicializa SST en ./app              ║"
	@echo "║    sst-deploy   Despliega Next.js en AWS             ║"
	@echo "║    sst-remove   Elimina el deploy de Next.js         ║"
	@echo "╠══════════════════════════════════════════════════════╣"
	@echo "║  🎯 DEPLOY COMPLETO                                   ║"
	@echo "║    deploy-all   Terraform + API + Next.js            ║"
	@echo "╚══════════════════════════════════════════════════════╝"
	@echo ""

# ============================================
# 🐳 DOCKER
# ============================================

build-api:
	@echo "🔨 Construyendo imagen de la API..."
	docker compose $(DOCKER_PROFILE) build api

build-app:
	@echo "🔨 Construyendo imagen de la APP..."
	docker compose $(DOCKER_PROFILE) build app

build-all:
	@echo "🔨 Construyendo todo el stack..."
	docker compose $(DOCKER_PROFILE) build

up-db:
	@echo "🐘 Levantando Postgres..."
	docker compose up -d postgres

up-full:
	@echo "🚀 Levantando Fullstack (Postgres, API, APP)..."
	docker compose $(DOCKER_PROFILE) up

down:
	@echo "🛑 Deteniendo contenedores..."
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

# ============================================
# 💻 NATIVO
# ============================================

PID_API := .api.pid
PID_APP := .app.pid

install:
	@echo "📦 Instalando dependencias..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw clean install -DskipTests; else mvn clean install -DskipTests; fi
	cd $(APP_DIR) && bun install

run-api:
	@echo "🚀 Iniciando API (Nativo)..."
	cd $(API_DIR) && if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi

run-app:
	@echo "🚀 Iniciando APP (Nativo)..."
	cd $(APP_DIR) && bun run dev

run-all:
	@echo "🚦 Iniciando servicios nativos en background..."
	@cd $(API_DIR) && (if [ -f "./mvnw" ]; then ./mvnw spring-boot:run; else mvn spring-boot:run; fi) > /dev/null 2>&1 & echo $$! > $(PID_API)
	@cd $(APP_DIR) && bun run dev > /dev/null 2>&1 & echo $$! > $(PID_APP)
	@echo "✅ API y APP corriendo nativamente."

stop-all:
	@echo "🛑 Deteniendo procesos nativos..."
	@if [ -f $(PID_API) ]; then kill $$(cat $(PID_API)) || true; rm $(PID_API); fi
	@if [ -f $(PID_APP) ]; then kill $$(cat $(PID_APP)) || true; rm $(PID_APP); fi

# ============================================
# 🏗️ TERRAFORM
# ============================================

tf-init:
	@echo "🏗️  Inicializando Terraform..."
	@if [ ! -f "$(INFRA_DIR)/terraform.tfvars" ]; then \
		cp $(INFRA_DIR)/terraform.tfvars.example $(INFRA_DIR)/terraform.tfvars; \
		echo "⚠️  Se creó infra/terraform.tfvars — edítalo con tus valores antes de continuar"; \
		exit 1; \
	fi
	cd $(INFRA_DIR) && terraform init

tf-plan:
	@echo "🔍 Previsualizando cambios de infraestructura..."
	cd $(INFRA_DIR) && terraform plan

tf-apply:
	@echo "🚀 Aplicando infraestructura en AWS..."
	cd $(INFRA_DIR) && terraform apply
	@echo ""
	@echo "✅ Infraestructura lista. Outputs:"
	@$(MAKE) tf-output

tf-destroy:
	@echo "⚠️  DESTRUYENDO infraestructura..."
	@read -p "¿Estás seguro? Escribe 'si' para continuar: " confirm && [ "$$confirm" = "si" ]
	cd $(INFRA_DIR) && terraform destroy

tf-output:
	@echo "📋 Outputs de Terraform:"
	@cd $(INFRA_DIR) && terraform output
	@echo ""
	@echo "📌 API Gateway URL para SST:"
	@cd $(INFRA_DIR) && terraform output -raw api_gateway_url

# ============================================
# 🚀 DEPLOY API (ECR + ECS)
# ============================================

# Obtiene account ID y ECR URL desde terraform outputs
_ecr_url:
	$(eval ECR_URL := $(shell cd $(INFRA_DIR) && terraform output -raw ecr_repository_url))
	$(eval ACCOUNT_ID := $(shell cd $(INFRA_DIR) && terraform output -raw account_id))
	$(eval CLUSTER := $(shell cd $(INFRA_DIR) && terraform output -raw ecs_cluster_name))
	$(eval SERVICE := $(shell cd $(INFRA_DIR) && terraform output -raw ecs_service_name))

ecr-login: _ecr_url
	@echo "🔐 Login en ECR..."
	aws ecr get-login-password --region $(AWS_REGION) --profile $(AWS_PROFILE) | \
		docker login --username AWS --password-stdin $(ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com

docker-push: _ecr_url ecr-login
	@echo "🔨 Build de imagen Spring Boot..."
	docker build -t $(ECR_URL):latest $(API_DIR)
	@echo "📤 Push al ECR..."
	docker push $(ECR_URL):latest
	@echo "✅ Imagen subida: $(ECR_URL):latest"

deploy-api: _ecr_url docker-push
	@echo "🔄 Forzando redeploy en ECS..."
	aws ecs update-service \
		--cluster $(CLUSTER) \
		--service $(SERVICE) \
		--force-new-deployment \
		--region $(AWS_REGION) \
		--profile $(AWS_PROFILE) \
		--output table
	@echo "✅ Deploy iniciado. Monitorea con: make logs-ecs"

logs-ecs: _ecr_url
	@echo "📋 Logs de ECS (últimas 50 líneas)..."
	aws logs tail /ecs/cinemo-api \
		--follow \
		--region $(AWS_REGION) \
		--profile $(AWS_PROFILE)

# ============================================
# 🌐 SST (Next.js)
# ============================================

sst-init:
	@echo "⚡ Inicializando SST en ./app..."
	@if [ ! -f "$(APP_DIR)/sst.config.ts" ]; then \
		cd $(APP_DIR) && bunx sst@latest init; \
	else \
		echo "ℹ️  sst.config.ts ya existe, saltando init."; \
	fi

sst-deploy: _ecr_url
	@echo "🌐 Desplegando Next.js con SST..."
	$(eval API_GW_URL := $(shell cd $(INFRA_DIR) && terraform output -raw api_gateway_url))
	@if [ -z "$(API_GW_URL)" ]; then \
		echo "❌ No se encontró api_gateway_url. Corre 'make tf-apply' primero."; \
		exit 1; \
	fi
	cd $(APP_DIR) && \
		AWS_PROFILE=$(AWS_PROFILE) \
		API_GATEWAY_URL=$(API_GW_URL) \
		bunx sst deploy --stage production
	@echo "✅ Next.js deployado."

sst-remove:
	@echo "🗑️  Eliminando deploy de Next.js..."
	cd $(APP_DIR) && AWS_PROFILE=$(AWS_PROFILE) bunx sst remove --stage production

# ============================================
# 🎯 DEPLOY COMPLETO (en orden)
# ============================================

deploy-all:
	@echo "🎯 Deploy completo: Terraform → API → Next.js"
	@echo ""
	@echo "Paso 1/3: Infraestructura con Terraform..."
	@$(MAKE) tf-apply
	@echo ""
	@echo "Paso 2/3: Imagen Docker y deploy en ECS..."
	@$(MAKE) deploy-api
	@echo ""
	@echo "Paso 3/3: Next.js con SST..."
	@$(MAKE) sst-deploy
	@echo ""
	@echo "✅ Deploy completo finalizado."
	@echo "🌐 API: $$(cd $(INFRA_DIR) && terraform output -raw api_gateway_url)/api/v1"