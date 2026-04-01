import { Router } from 'express';

export const createReservationRouter = (controller) => {
  const router = Router();

  router.post('/', controller.create);
  router.delete('/:id', controller.cancel);
  router.get('/user/:userId', controller.byUser);

  return router;
};
