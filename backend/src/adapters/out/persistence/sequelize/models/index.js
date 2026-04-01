import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './reservations.sqlite',
  logging: false
});

export const RoomModel = sequelize.define('Room', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  capacity: { type: DataTypes.INTEGER, allowNull: false },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
  tableName: 'rooms',
  timestamps: false
});

export const UserModel = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'users',
  timestamps: false
});

export const ReservationModel = sequelize.define('Reservation', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  roomId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'reservations',
  timestamps: false
});
