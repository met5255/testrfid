import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'adminUsers',
})

export class AdminUsers extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
    enabled!: boolean; 
}