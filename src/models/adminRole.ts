/* eslint-disable no-unused-vars */
import { Table, Model, Column, DataType } from 'sequelize-typescript';

enum AdminRoles {
    superAdmin = '1',
    simple = '2',
    onliview = '3',
  }

@Table({
  timestamps: false,
  tableName: 'adminRole',
})

export class AdminRole extends Model {
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
      adminId!: number;

    @Column({
      type: DataType.ENUM(...Object.values(AdminRoles)),
      allowNull: false,
    })
      roleNum!: AdminRoles;
}