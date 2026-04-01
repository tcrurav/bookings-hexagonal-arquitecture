[English](README.md) | [Español](README.es.md)

<!-- README.md defaults to English. Click a language above to view the other file. -->

# Booking App Example using Hexagonal Architecture - Node/Express/Sequelize + React

Simple template for a reservation management application using hexagonal architecture.

## Learning objective

Show how to keep the business core stable while technology adapters change:

- Backend: Node.js + Express + Sequelize
- Frontend: React + Vite
- Database: SQLite for learning simplicity

## Structure

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

## Requirements

- Node.js 20 or newer

## Getting started

### Backend

```bash
cd backend
cp env.example .env
npm install
npm run dev
```

Default server at `http://localhost:3000`. Edit .env to change the port or database file if needed.

### Frontend

```bash
cd frontend-react
cp env.example .env
npm install
npm run dev
```

Default client at `http://localhost:5173`. Edit .env to change the API URL if needed.

## Endpoints

- `GET /api/rooms/available?startTime=2026-04-10T10:00:00&endTime=2026-04-10T11:00:00`
- `POST /api/reservations`
- `DELETE /api/reservations/:id`
- `GET /api/reservations/user/:userId`

## Sample data

When the backend starts, it creates:

- 2 rooms
- 2 users

## Template notes

- The core (`src/core`) does not depend on Express or Sequelize.
- Replacing SQLite with MySQL/PostgreSQL affects the persistence adapter, not the use cases.
- Replacing React with Angular affects the frontend, not the domain.

## Suggested improvements

- authentication
- roles
- advanced validation
- unit tests for the core
- a second persistence adapter
