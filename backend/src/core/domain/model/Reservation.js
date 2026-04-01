import { ReservationStatus } from './ReservationStatus.js';

export class Reservation {
  constructor({ id = null, roomId, userId, startTime, endTime, status = ReservationStatus.ACTIVE }) {
    this.id = id;
    this.roomId = roomId;
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
  }

  cancel() {
    this.status = ReservationStatus.CANCELLED;
  }
}
