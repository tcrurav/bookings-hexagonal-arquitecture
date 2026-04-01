import { RoomModel } from '../models/index.js';
import { PersistenceMapper } from '../mappers/PersistenceMapper.js';

export class RoomRepositorySequelizeAdapter {
  async findById(id) {
    const entity = await RoomModel.findByPk(id);
    return PersistenceMapper.toRoomDomain(entity);
  }

  async findAllActive() {
    const entities = await RoomModel.findAll({ where: { active: true } });
    return entities.map(PersistenceMapper.toRoomDomain);
  }
}
