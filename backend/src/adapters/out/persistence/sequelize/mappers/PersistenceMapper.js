import { Room } from '../../../../../core/domain/model/Room.js';
import { User } from '../../../../../core/domain/model/User.js';
import { Reservation } from '../../../../../core/domain/model/Reservation.js';

export const PersistenceMapper = {
  toRoomDomain(entity) {
    if (!entity) return null;
    return new Room({
      id: entity.id,
      name: entity.name,
      capacity: entity.capacity,
      active: entity.active
    });
  },

  toUserDomain(entity) {
    if (!entity) return null;
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email
    });
  },

  toReservationDomain(entity) {
    if (!entity) return null;
    return new Reservation({
      id: entity.id,
      roomId: entity.roomId,
      userId: entity.userId,
      startTime: new Date(entity.startTime),
      endTime: new Date(entity.endTime),
      status: entity.status
    });
  },

  toReservationPersistence(domain) {
    return {
      id: domain.id,
      roomId: domain.roomId,
      userId: domain.userId,
      startTime: domain.startTime,
      endTime: domain.endTime,
      status: domain.status
    };
  }
};
