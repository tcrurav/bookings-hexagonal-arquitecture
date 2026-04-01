export class ReservationRepositoryPort {
  async save(_reservation) { throw new Error('Not implemented'); }
  async findById(_id) { throw new Error('Not implemented'); }
  async findByUserId(_userId) { throw new Error('Not implemented'); }
  async findActiveByRoomAndTimeRange(_roomId, _start, _end) { throw new Error('Not implemented'); }
  async findActiveByUserAndTimeRange(_userId, _start, _end) { throw new Error('Not implemented'); }
  async findActiveByTimeRange(_start, _end) { throw new Error('Not implemented'); }
}
