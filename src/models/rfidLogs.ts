import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'rfidLogs',
})

export class RfIdLogs extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    roomId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
    userId!: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    roomName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    userRfId!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    status!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    date!: string; 
}