import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'socketRooms',
})

export class SocketRooms extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    roomName!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    enabled!: boolean;
}