import { RequestHandler } from 'express';
import { literal, Op } from 'sequelize';
import { Users } from '../models/users';
import { RfidList } from '../models/rfidList';

export const createUser: RequestHandler = async (req, res) => {
  await Users.create({...req.body});
  return res
    .status(200)
    .json({message: 'User create Successfully'});   
};

export const deleteUser: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await Users.destroy({where: {id}});
  return res.status(200).json({message: 'User delete successfully'});
};

export const getAllUsers: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await Users.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'Users fetched successfully', data: data});
};

export const getUserById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const users: Users | null = await Users.findByPk(id);
  return res.status(200).json({message: 'User fetched successfully', data: users});
};

export const getUserByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const users: Users[] | null = await Users.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'Users fetched successfully', data: users});
};

export const getUserByRFID: RequestHandler = async (req, res) => {
  const {rfid} = req.params;
  const userID: RfidList | null = await RfidList.findOne({where: {rfId: rfid}});
  const users: Users | null = await Users.findByPk(userID?.userId);
  return res.status(200).json({message: 'Users fetched successfully', data: users});
};

export const getUserByZipCode: RequestHandler = async (req, res) => {
  const {zipcod} = req.params;
  const users: Users[] | null = await Users.findAll({where: {zipCod: zipcod}});
  return res.status(200).json({message: 'Users fetched successfully', data: users});
};

export const getUserByCountry: RequestHandler = async (req, res) => {
  const {country} = req.params;
  const users: Users[] | null = await Users.findAll({where: {country: country}});
  return res.status(200).json({message: 'Users fetched successfully', data: users});
};

export const getUserByFullName: RequestHandler = async (req, res) => {
  const {name} = req.params;
  const users: Users[] | null = await Users.findAll({
    where:{
      [Op.or]: [
        {
          firstName: {
            [Op.like]:`%${name}%`
          }
        },
        {
          lastMame: {
            [Op.like]:`%${name}%`
          }
        }
      ]
    }
  });

  return res.status(200).json({message: 'User Searched successfully', data: users});
};

export const updateUser: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await Users.update({...req.body}, {where: {id}});
  const userUpdat: Users | null = await Users.findByPk(id);
  return res.status(200).json({message: 'Users update successfully', data: userUpdat});
};