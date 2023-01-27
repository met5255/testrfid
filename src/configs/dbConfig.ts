import { Sequelize } from 'sequelize-typescript';
import SQLite from 'sqlite3';
import { Users } from '../models/users';
import { AdminUsers } from '../models/adminUsers';
import { AdminRole } from '../models/adminRole';
import { SocketRooms } from '../models/socketRooms';
import { RfidList } from '../models/rfidList';
import { Foods } from '../models/foods';
import { FoodsSensitivity } from '../models/foodsSensitivity';
import { RfIdLogs } from '../models/rfidLogs';
import { UserRommConnector } from '../models/userRoomConnector';

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './src/DB/database.sqlite', // or ':memory:'
  logging:false,
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
  models:[Users,
    SocketRooms,
    RfIdLogs,
    UserRommConnector,
    RfidList,
    Foods,
    FoodsSensitivity,
    AdminUsers,
    AdminRole]
});

export default connection;