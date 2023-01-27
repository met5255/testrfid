import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'foods',
})

export class Foods extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    foodName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    sensitivity!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    enabled!: boolean; 
}