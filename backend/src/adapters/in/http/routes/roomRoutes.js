import { Router } from 'express';

export const createRoomRouter = (controller) => {
  const router = Router();

  router.get('/available', controller.available);

  return router;
};
