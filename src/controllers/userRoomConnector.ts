import { RequestHandler } from 'express';
import { UserRommConnector } from '../models/userRoomConnector';

export const createUserToRoom: RequestHandler = async (req, res) => {
  await UserRommConnector.create({...req.body});
  return res
    .status(200)
    .json({message: 'Add User to the Room Successfully'});   
};

export const deleteUserfromRoom: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await UserRommConnector.destroy({where: {id}});
  return res.status(200).json({message: 'Deleted User from the Room Successfully'});
};