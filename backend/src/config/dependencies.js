import { ReservationService } from '../core/application/service/ReservationService.js';
import { RoomRepositorySequelizeAdapter } from '../adapters/out/persistence/sequelize/repositories/RoomRepositorySequelizeAdapter.js';
import { UserRepositorySequelizeAdapter } from '../adapters/out/persistence/sequelize/repositories/UserRepositorySequelizeAdapter.js';
import { ReservationRepositorySequelizeAdapter } from '../adapters/out/persistence/sequelize/repositories/ReservationRepositorySequelizeAdapter.js';
import { reservationController } from '../adapters/in/http/controllers/reservationController.js';
import { roomController } from '../adapters/in/http/controllers/roomController.js';

export const buildDependencies = () => {
  const roomRepository = new RoomRepositorySequelizeAdapter();
  const userRepository = new UserRepositorySequelizeAdapter();
  const reservationRepository = new ReservationRepositorySequelizeAdapter();

  const reservationService = new ReservationService({
    reservationRepository,
    roomRepository,
    userRepository
  });

  return {
    reservationService,
    reservationController: reservationController({ reservationService }),
    roomController: roomController({ reservationService })
  };
};
