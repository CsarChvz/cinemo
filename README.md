# 🎬 Cinemo

**Sistema de Reservaciones de Cine en Línea**

Cinemo es una plataforma full-stack para la gestión de cines y compra de boletos en línea. Los administradores gestionan el catálogo completo (películas, funciones, salas, geografía), mientras los usuarios pueden explorar la cartelera, seleccionar asientos en tiempo real, unirse a listas de espera y completar la compra de sus boletos con respaldo transaccional automático.

---

## Arquitectura

🏗️ Arquitectura
El backend es un monolito modular. Toda la lógica de negocio, seguridad, persistencia y exposición HTTP viven en un único proceso JVM. Para mantener un código limpio y escalable, la aplicación sigue los principios de Arquitectura Hexagonal (Ports & Adapters), dividiendo el sistema en tres capas claramente aisladas:

Capa de Dominio (Domain): Es el corazón del sistema. Aquí residen las entidades puras de negocio (Booking, Ticket), la lógica central y las estructuras de datos personalizadas (Pilas, Colas, Listas Enlazadas, Grafos). En esta capa se definen los Puertos (interfaces) de entrada (in) y salida (out). Cero dependencias de frameworks externos (no sabe qué es Spring ni JPA).

Capa de Aplicación (Application): Contiene los casos de uso (BookingService, TicketService). Actúa como el orquestador: recibe comandos a través de los puertos de entrada, ejecuta la lógica de dominio y se comunica con el exterior usando los puertos de salida.

Capa de Infraestructura (Infrastructure): Aquí viven los Adaptadores que conectan al monolito con el mundo exterior. Incluye los Controladores REST, la seguridad (filtros JWT), la configuración de Spring Boot y los repositorios de base de datos (JpaAdapter, BookingEntity). Convierte las peticiones HTTP y los datos de PostgreSQL en objetos que el Dominio puede entender.

El frontend es una aplicación Next.js que se comunica con la API REST. Ambos servicios y la base de datos se orquestan con Docker Compose en un único comando.

```
┌───────────────────────────────────────────────────┐
│                  Docker Compose                   │
│                                                   │
│  ┌──────────┐   REST/HTTP  ┌───────────────────┐  │
│  │ Next.js  │ ──────────── │  Spring Boot API  │  │
│  │  :3000   │              │      :8080        │  │
│  └──────────┘              └────────┬──────────┘  │
│                                     │ JPA/JDBC    │
│                              ┌──────▼──────┐      │
│                              │ PostgreSQL  │      │
│                              │   :5432     │      │
│                              └─────────────┘      │
└───────────────────────────────────────────────────┘
```

El monolito implementa seis estructuras de datos personalizadas (Pilas, Colas y Listas Enlazadas construidas desde cero) que gestionan la selección interactiva de asientos, rollback transaccional, listas de espera y búsqueda geográfica por grafo con Floyd-Warshall.

---

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (incluye Docker Compose)
- [Make](https://www.gnu.org/software/make/) — disponible por defecto en macOS/Linux; en Windows instalar con [Chocolatey](https://chocolatey.org/): `choco install make`
- Java JDK 21 _(solo para ejecución nativa sin Docker)_

---

## Inicio rápido

### 1. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores si es necesario (los valores por defecto funcionan para desarrollo local):

```env
API_PORT=8080
APP_PORT=3000
DB_NAME=mydatabase
DB_USER=myuser
DB_PASSWORD=secret
```

### 2. Levantar la aplicación completa

```bash
make build-all   # Construye las imágenes Docker
make up          # Levanta API + Frontend + PostgreSQL en background
```

Los servicios quedan disponibles en:

| Servicio | URL |
|---|---|
| Frontend | http://localhost:3000 |
| API REST | http://localhost:8080/api/v1 |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| PostgreSQL | `localhost:5432` |

### 3. Ver logs

```bash
make logs        # Todos los servicios
make logs-api    # Solo la API
make logs-app    # Solo el frontend
```

### 4. Detener el entorno

```bash
make down        # Detiene y elimina contenedores (los datos en BD se conservan)
make clean-db    # Reset total — elimina contenedores y volúmenes de BD
```

---

## Comandos Makefile

### 🐳 Docker

| Comando | Descripción |
|---|---|
| `make build-all` | Construye todas las imágenes Docker (API + App) |
| `make build-api` | Construye únicamente la imagen de la API Spring Boot |
| `make build-app` | Construye únicamente la imagen del frontend Next.js |
| `make up` | Levanta todos los servicios en background (`docker compose up -d`) |
| `make up-build` | Fuerza rebuild y levanta (útil tras cambios en código) |
| `make down` | Detiene y elimina los contenedores (los volúmenes se conservan) |
| `make logs` | Sigue los logs en tiempo real de todos los servicios |
| `make logs-api` | Sigue los logs en tiempo real solo de la API |
| `make logs-app` | Sigue los logs en tiempo real solo del frontend |
| `make clean-db` | Reset total: elimina contenedores **y volúmenes** (borra todos los datos de la BD) |

### 💻 Nativo (sin Docker)

Requiere Java 21 instalado. PostgreSQL debe estar corriendo (puedes levantarlo con `docker compose up -d postgres`).

| Comando | Descripción |
|---|---|
| `make install` | Instala dependencias: Maven (`mvn clean install`) y NPM (`npm install`) |
| `make run-api` | Inicia la API con `mvn spring-boot:run` |
| `make run-app` | Inicia el frontend con `npm run dev` |
| `make run-all` | Lanza API y frontend simultáneamente en procesos de background |
| `make stop-all` | Detiene los procesos background lanzados por `run-all` |

---

## Estructura del repositorio

```
cinemo/
├── api/                  # Backend — Spring Boot (Java 21, Maven)
│   ├── src/main/java/com/cinemo/api/
│   │   ├── domain/       # Entidades, puertos, estructuras de datos
│   │   ├── application/  # Servicios de aplicación
│   │   └── infrastructure/ # Controllers, JPA, Seguridad, Config
│   └── Dockerfile
├── app/                  # Frontend — Next.js + tRPC
│   └── Dockerfile
├── docker-compose.yml    # Orquestación de servicios
├── Makefile              # Comandos del proyecto
└── .env.example          # Plantilla de variables de entorno
```

---

## Documentación

Con el proyecto corriendo, la documentación interactiva de la API está disponible en Swagger UI:

```
http://localhost:8080/swagger-ui/index.html
```

Para documentación detallada consulta:

- **`Manual_Usuario_Cinemo.md`** — Guía de endpoints, flujos de usuario y descripción de funcionalidades.
- **`Manual_Tecnico_Cinemo.md`** — Arquitectura, modelo de datos, estructuras de datos con análisis de complejidad y configuración de infraestructura.