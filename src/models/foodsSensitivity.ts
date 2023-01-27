import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'foodsSensitivity',
})

export class FoodsSensitivity extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    sensitivityName!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    enabled!: boolean; 
}