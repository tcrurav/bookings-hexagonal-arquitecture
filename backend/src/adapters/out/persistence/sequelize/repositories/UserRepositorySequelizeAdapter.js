import { UserModel } from '../models/index.js';
import { PersistenceMapper } from '../mappers/PersistenceMapper.js';

export class UserRepositorySequelizeAdapter {
  async findById(id) {
    const entity = await UserModel.findByPk(id);
    return PersistenceMapper.toUserDomain(entity);
  }
}
