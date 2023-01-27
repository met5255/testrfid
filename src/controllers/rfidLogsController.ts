import { RequestHandler } from 'express';
import { literal } from 'sequelize';
import { RfIdLogs } from '../models/rfidLogs';


export const getAllRfIdLogs: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await RfIdLogs.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: data});
};

export const getRfIdLogsById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const logs: RfIdLogs | null = await RfIdLogs.findByPk(id);
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: logs});
};

export const getRfIdLogsByRoomId: RequestHandler = async (req, res) => {
  const {roomid} = req.params;
  const logs: RfIdLogs[] | null = await RfIdLogs.findAll({where:{roomId:roomid}});
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: logs});
};

export const getRfIdLogsByUserId: RequestHandler = async (req, res) => {
  const {userid} = req.params;
  const logs: RfIdLogs[] | null = await RfIdLogs.findAll({where:{userId:userid}});
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: logs});
};

export const getRfIdLogsByRoomName: RequestHandler = async (req, res) => {
  const {roomname} = req.params;
  const logs: RfIdLogs[] | null = await RfIdLogs.findAll({where:{roomName:roomname}});
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: logs});
};
  
export const getRfIdLogsByUserRfId: RequestHandler = async (req, res) => {
  const {userrfid} = req.params;
  const logs: RfIdLogs[] | null = await RfIdLogs.findAll({where:{userRfId:userrfid}});
  return res.status(200).json({message: 'RFID Logs fetched successfully', data: logs});
};
    