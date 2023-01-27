import { RequestHandler } from 'express';
import { literal } from 'sequelize';
import { RfidList } from '../models/rfidList';

export const createRfidList: RequestHandler = async (req, res) => {
  await RfidList.create({...req.body});
  return res
    .status(200)
    .json({message: 'RfidList create Successfully'});   
};

export const deleteRfidList: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await RfidList.destroy({where: {id}});
  return res.status(200).json({message: 'RfidList delete successfully'});
};

export const getAllRfidList: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await RfidList.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'RfidList fetched successfully', data: data});
};

export const getRfidListById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const rfidList: RfidList | null = await RfidList.findByPk(id);
  return res.status(200).json({message: 'RfidList fetched successfully', data: rfidList});
};

export const getRfidListByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const rfidList: RfidList[] | null = await RfidList.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'RfidList fetched successfully', data: rfidList});
};

export const getRfidListByRfid: RequestHandler = async (req, res) => {
  const {rfId} = req.params;
  const rfidList: RfidList | null = await RfidList.findOne({where: {rfId: rfId}});
  return res.status(200).json({message: 'RfidList fetched successfully', data: rfidList});
};

export const getRfidListByUserId: RequestHandler = async (req, res) => {
  const {userid} = req.params;
  const rfidList: RfidList | null = await RfidList.findOne({where: {userId: userid}});
  return res.status(200).json({message: 'RfidList fetched successfully', data: rfidList});
};

export const updateRfidList: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await RfidList.update({...req.body}, {where: {id}});
  const rfidlistUpdate: RfidList | null = await RfidList.findByPk(id);
  return res.status(200).json({message: 'RfidList update successfully', data: rfidlistUpdate});
};