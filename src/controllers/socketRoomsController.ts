import { RequestHandler } from 'express';
import { literal } from 'sequelize';
import { SocketRooms } from '../models/socketRooms';
import { UserRommConnector } from '../models/userRoomConnector';

export const createSocketRooms: RequestHandler = async (req, res) => {
  await SocketRooms.create({...req.body});
  return res
    .status(200)
    .json({message: 'SocketRooms create Successfully'});   
};

export const deleteSocketRooms: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await SocketRooms.destroy({where: {id}});
  return res.status(200).json({message: 'SocketRooms delete successfully'});
};

export const getAllSocketRooms: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await SocketRooms.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'SocketRooms fetched successfully', data: data});
};

export const getSocketRoomsById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const socketRooms: SocketRooms | null = await SocketRooms.findByPk(id);
  return res.status(200).json({message: 'SocketRooms fetched successfully', data: socketRooms});
};

export const getSocketRoomsByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const socketRooms: SocketRooms[] | null = await SocketRooms.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'SocketRooms fetched successfully', data: socketRooms});
};

export const getSocketRoomsByRoomName: RequestHandler = async (req, res) => {
  const {roomname} = req.params;
  const socketRooms: SocketRooms | null = await SocketRooms.findOne({where: {roomName: roomname}});
  return res.status(200).json({message: 'SocketRooms fetched successfully', data: socketRooms});
};

export const getUsersInSocketRoomsByRoomId: RequestHandler = async (req, res) => {
  const {roomid} = req.params;
  const userRommConnector: UserRommConnector[] | null = await UserRommConnector.findAll({where: {roomId: roomid}});
  return res.status(200).json({message: 'SocketRooms fetched successfully', data: userRommConnector});
};

export const updateSocketRooms: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await SocketRooms.update({...req.body}, {where: {id}});
  const socketRoomsUpdate: SocketRooms | null = await SocketRooms.findByPk(id);
  return res.status(200).json({message: 'SocketRooms update successfully', data: socketRoomsUpdate});
};