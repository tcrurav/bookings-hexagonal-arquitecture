export const roomController = ({ reservationService }) => ({
  available: async (req, res, next) => {
    try {
      const { startTime, endTime } = req.query;
      const rooms = await reservationService.listAvailable(startTime, endTime);
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  }
});
