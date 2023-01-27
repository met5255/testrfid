import { RequestHandler } from 'express';
import { literal } from 'sequelize';
import { FoodsSensitivity } from '../models/foodsSensitivity';

export const createFoodsSensitivity: RequestHandler = async (req, res) => {
  await FoodsSensitivity.create({...req.body});
  return res
    .status(200)
    .json({message: 'FoodsSensitivity create Successfully'});   
};

export const deleteFoodsSensitivity: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await FoodsSensitivity.destroy({where: {id}});
  return res.status(200).json({message: 'FoodsSensitivity delete successfully'});
};

export const getAllFoodsSensitivity: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await FoodsSensitivity.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'FoodsSensitivity fetched successfully', data: data});
};

export const getFoodsSensitivityById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const foodsSensitivity: FoodsSensitivity | null = await FoodsSensitivity.findByPk(id);
  return res.status(200).json({message: 'FoodsSensitivity fetched successfully', data: foodsSensitivity});
};

export const getFoodsSensitivityByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const foodsSensitivity: FoodsSensitivity[] | null = await FoodsSensitivity.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'FoodsSensitivity fetched successfully', data: foodsSensitivity});
};

export const getFoodsSensitivityByName: RequestHandler = async (req, res) => {
  const {name} = req.params;
  const foodsSensitivity: FoodsSensitivity | null = await FoodsSensitivity.findOne({where: {sensitivityName: name}});
  return res.status(200).json({message: 'FoodsSensitivity fetched successfully', data: foodsSensitivity});
};

export const updateFoodsSensitivity: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await FoodsSensitivity.update({...req.body}, {where: {id}});
  const foodsenSitivityUpdate: FoodsSensitivity | null = await FoodsSensitivity.findByPk(id);
  return res.status(200).json({message: 'FoodsSensitivity update successfully', data: foodsenSitivityUpdate});
};