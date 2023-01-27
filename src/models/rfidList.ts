import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'rfidList',
})

export class RfidList extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    rfId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
    userId!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    enabled!: boolean; 
}