import { Op } from 'sequelize';
import { ReservationModel } from '../models/index.js';
import { PersistenceMapper } from '../mappers/PersistenceMapper.js';

const activeOverlapWhere = (extraWhere, start, end) => ({
  ...extraWhere,
  status: 'ACTIVE',
  startTime: { [Op.lt]: end },
  endTime: { [Op.gt]: start }
});

export class ReservationRepositorySequelizeAdapter {
  async save(reservation) {
    const payload = PersistenceMapper.toReservationPersistence(reservation);

    if (payload.id) {
      await ReservationModel.update(payload, { where: { id: payload.id } });
      const updated = await ReservationModel.findByPk(payload.id);
      return PersistenceMapper.toReservationDomain(updated);
    }

    const created = await ReservationModel.create(payload);
    return PersistenceMapper.toReservationDomain(created);
  }

  async findById(id) {
    const entity = await ReservationModel.findByPk(id);
    return PersistenceMapper.toReservationDomain(entity);
  }

  async findByUserId(userId) {
    const entities = await ReservationModel.findAll({ where: { userId }, order: [['startTime', 'ASC']] });
    return entities.map(PersistenceMapper.toReservationDomain);
  }

  async findActiveByRoomAndTimeRange(roomId, start, end) {
    const entities = await ReservationModel.findAll({ where: activeOverlapWhere({ roomId }, start, end) });
    return entities.map(PersistenceMapper.toReservationDomain);
  }

  async findActiveByUserAndTimeRange(userId, start, end) {
    const entities = await ReservationModel.findAll({ where: activeOverlapWhere({ userId }, start, end) });
    return entities.map(PersistenceMapper.toReservationDomain);
  }

  async findActiveByTimeRange(start, end) {
    const entities = await ReservationModel.findAll({ where: activeOverlapWhere({}, start, end) });
    return entities.map(PersistenceMapper.toReservationDomain);
  }
}
