[English](README.md) | [Español](README.es.md)

# Reservas Hexagonal - Node/Express/Sequelize + React

Plantilla sencilla de una aplicación de gestión de reservas con arquitectura hexagonal.

## Objetivo didáctico

Mostrar cómo mantener el núcleo de negocio estable mientras cambian los adaptadores tecnológicos:

- Backend: Node.js + Express + Sequelize
- Frontend: React + Vite
- Base de datos: SQLite por simplicidad en el aprendizaje

## Estructura

```text
backend/
  src/
    core/
      domain/
      application/
    adapters/
      in/http/
      out/persistence/sequelize/

frontend-react/
  src/
    core/
    features/
    shared/
```

## Requisitos

- Node.js 20 o superior

## Puesta en marcha

### Backend

```bash
cd backend
cp env.example .env
npm install
npm run dev
```

Servidor por defecto en `http://localhost:3000`. Edita `.env` para cambiar el puerto o el archivo de base de datos si es necesario.

### Frontend

```bash
cd frontend-react
cp env.example .env
npm install
npm run dev
```

Cliente por defecto en `http://localhost:5173`. Edita `.env` para cambiar la URL de la API si es necesario.

## Endpoints

- `GET /api/rooms/available?startTime=2026-04-10T10:00:00&endTime=2026-04-10T11:00:00`
- `POST /api/reservations`
- `DELETE /api/reservations/:id`
- `GET /api/reservations/user/:userId`

## Datos de ejemplo

Al arrancar el backend se crean:

- 2 salas
- 2 usuarios

## Notas de la plantilla

- El núcleo (`src/core`) no depende de Express ni de Sequelize.
- Cambiar SQLite por MySQL/PostgreSQL afecta al adaptador de persistencia, no a los casos de uso.
- Cambiar React por Angular afecta al frontend, no al dominio.

## Mejoras sugeridas

- autenticación
- roles
- validación avanzada
- tests unitarios del núcleo
- segundo adaptador de persistencia
