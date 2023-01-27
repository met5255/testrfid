import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'usersocketRoomsConnector',
})

export class UserRommConnector extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    roomId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
    userId!: number;
}