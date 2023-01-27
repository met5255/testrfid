import { RequestHandler } from 'express';
import { literal } from 'sequelize';

import {AdminRole} from '../models/adminRole';

export const createAdminRole: RequestHandler = async (req, res) => {
  const adminRole = await AdminRole.create({...req.body});
  return res
    .status(200)
    .json({message: 'AdminRole create Successfully', data: adminRole});
};

export const deleteAdminRole: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const deleteadminRole: AdminRole | null = await AdminRole.findByPk(id);

  await AdminRole.destroy({where: {id}});
  return res.status(200).json({message: 'Todo delete successfully', data: deleteadminRole});
};

export const getAllAdminRole: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await AdminRole.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'AdminRole fetched successfully', data: data});
};

export const getAdminRoleByadminId: RequestHandler = async (req, res) => {
  const {adminid} = req.params;
  const adminRole: AdminRole[] | null = await AdminRole.findAll({where: {adminId: adminid}});
  return res.status(200).json({message: 'AdminRole fetched successfully', data: adminRole});
};


export const getAdminRoleById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const adminRole: AdminRole | null = await AdminRole.findByPk(id);
  return res.status(200).json({message: 'AdminRole fetched successfully', data: adminRole});
};

export const updateAdminRole: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await AdminRole.update({...req.body}, {where: {id}});
  const updateadminRole: AdminRole | null = await AdminRole.findByPk(id);
  return res.status(200).json({message: 'AdminRole update successfully', data: updateadminRole});
};