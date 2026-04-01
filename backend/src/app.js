import express from 'express';
import cors from 'cors';
import { buildDependencies } from './config/dependencies.js';
import { createReservationRouter } from './adapters/in/http/routes/reservationRoutes.js';
import { createRoomRouter } from './adapters/in/http/routes/roomRoutes.js';
import { errorHandler } from './adapters/in/http/middleware/errorHandler.js';

export const createApp = () => {
  const app = express();
  const dependencies = buildDependencies();

  const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/reservations', createReservationRouter(dependencies.reservationController));
  app.use('/api/rooms', createRoomRouter(dependencies.roomController));
  app.use(errorHandler);

  return app;
};
