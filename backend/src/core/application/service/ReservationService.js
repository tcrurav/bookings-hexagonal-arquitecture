import { BusinessException } from '../../domain/exception/BusinessException.js';
import { NotFoundException } from '../../domain/exception/NotFoundException.js';
import { Reservation } from '../../domain/model/Reservation.js';
import { ReservationStatus } from '../../domain/model/ReservationStatus.js';

const MAX_DURATION_MINUTES = 120;
const OPEN_HOUR = 8;
const CLOSE_HOUR = 21;

export class ReservationService {
  constructor({ reservationRepository, roomRepository, userRepository }) {
    this.reservationRepository = reservationRepository;
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
  }

  async create(command) {
    const start = new Date(command.startTime);
    const end = new Date(command.endTime);
    this.#validateTimes(start, end);

    const room = await this.roomRepository.findById(command.roomId);
    if (!room) throw new NotFoundException('Room not found');

    const user = await this.userRepository.findById(command.userId);
    if (!user) throw new NotFoundException('User not found');

    const roomConflicts = await this.reservationRepository.findActiveByRoomAndTimeRange(command.roomId, start, end);
    if (roomConflicts.length > 0) {
      throw new BusinessException('The room is already booked for that time slot');
    }

    const userConflicts = await this.reservationRepository.findActiveByUserAndTimeRange(command.userId, start, end);
    if (userConflicts.length > 0) {
      throw new BusinessException('User already has a reservation in that time slot');
    }

    const reservation = new Reservation({
      roomId: command.roomId,
      userId: command.userId,
      startTime: start,
      endTime: end,
      status: ReservationStatus.ACTIVE
    });

    return this.reservationRepository.save(reservation);
  }

  async cancel(reservationId) {
    const reservation = await this.reservationRepository.findById(reservationId);
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.cancel();
    await this.reservationRepository.save(reservation);
  }

  async getByUserId(userId) {
    return this.reservationRepository.findByUserId(userId);
  }

  async listAvailable(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    this.#validateTimes(start, end);

    const allRooms = await this.roomRepository.findAllActive();
    const busyReservations = await this.reservationRepository.findActiveByTimeRange(start, end);
    const busyRoomIds = new Set(busyReservations.map((reservation) => reservation.roomId));

    return allRooms.filter((room) => !busyRoomIds.has(room.id));
  }

  #validateTimes(start, end) {
    if (!(start instanceof Date) || Number.isNaN(start.getTime()) || !(end instanceof Date) || Number.isNaN(end.getTime()) || end <= start) {
      throw new BusinessException('Invalid time range');
    }

    const minutes = Math.floor((end - start) / 60000);
    if (minutes > MAX_DURATION_MINUTES) {
      throw new BusinessException('Maximum duration is 2 hours');
    }

    const startHour = start.getHours();
    const endHour = end.getHours();
    const endMinute = end.getMinutes();

    if (startHour < OPEN_HOUR || endHour > CLOSE_HOUR || (endHour === CLOSE_HOUR && endMinute > 0)) {
      throw new BusinessException('Reservation is outside allowed hours');
    }
  }
}
