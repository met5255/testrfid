import { RequestHandler } from 'express';
import { literal, Op } from 'sequelize';
import { Foods } from '../models/foods';

export const createFoods: RequestHandler = async (req, res) => {
  await Foods.create({...req.body});
  return res
    .status(200)
    .json({message: 'Foods create Successfully'});   
};

export const deleteFoods: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await Foods.destroy({where: {id}});
  return res.status(200).json({message: 'Foods delete successfully'});
};

export const getAllFoods: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await Foods.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'Foods fetched successfully', data: data});
};

export const getFoodsById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const foods: Foods | null = await Foods.findByPk(id);
  return res.status(200).json({message: 'Foods fetched successfully', data: foods});
};

export const getFoodsByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const foods: Foods[] | null = await Foods.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'Foods fetched successfully', data: foods});
};

export const getFoodsByName: RequestHandler = async (req, res) => {
  const {name} = req.params;
  const foods: Foods | null = await Foods.findOne({where: {foodName: name}});
  return res.status(200).json({message: 'Foods fetched successfully', data: foods});
};

export const getFoodsBySensitivity: RequestHandler = async (req, res) => {
  const {sensitivity} = req.params;
  const arraySensitivity = JSON.parse(sensitivity);
  const arrayfoods = await arraySensitivity.maps(async (e:number) => {
    const foods: Foods[] | null = await Foods.findAll({where: {sensitivity:{[Op.like]:`%${e}$`}}});
    return foods;
  });
  return res.status(200).json({message: 'Foods fetched successfully', data: arrayfoods});
};

export const updateFoods: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await Foods.update({...req.body}, {where: {id}});
  const foodsUpdate: Foods | null = await Foods.findByPk(id);
  return res.status(200).json({message: 'Foods update successfully', data: foodsUpdate});
};