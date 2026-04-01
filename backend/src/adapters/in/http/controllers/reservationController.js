import { CreateReservationCommand } from '../../../../core/application/dto/CreateReservationCommand.js';

export const reservationController = ({ reservationService }) => ({
  create: async (req, res, next) => {
    try {
      const command = new CreateReservationCommand(req.body);
      const reservation = await reservationService.create(command);
      res.status(201).json(reservation);
    } catch (error) {
      next(error);
    }
  },

  cancel: async (req, res, next) => {
    try {
      await reservationService.cancel(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  byUser: async (req, res, next) => {
    try {
      const reservations = await reservationService.getByUserId(Number(req.params.userId));
      res.json(reservations);
    } catch (error) {
      next(error);
    }
  }
});
