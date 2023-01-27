import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'users',
})

export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    lastName!: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    unique: true,
  })
    sex!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    birthDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    nationality!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    country!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    zipCod!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
    roomNum!: number;
    
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
    extraAccommodation!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    dateOfArrival!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    firstMeal!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    dateOfDeparture!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    lastMeal!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: true,
  })
    szepCard!: string;
  
  @Column({
    type: DataType.DATE,
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