import { RoomModel, UserModel } from '../adapters/out/persistence/sequelize/models/index.js';

export const seedDatabase = async () => {
  const roomsCount = await RoomModel.count();
  if (roomsCount === 0) {
    await RoomModel.bulkCreate([
      { name: 'Aula 101', capacity: 30, active: true },
      { name: 'Sala Estudio 1', capacity: 10, active: true }
    ]);
  }

  const usersCount = await UserModel.count();
  if (usersCount === 0) {
    await UserModel.bulkCreate([
      { name: 'Ana', email: 'ana@centro.es' },
      { name: 'Luis', email: 'luis@centro.es' }
    ]);
  }
};
