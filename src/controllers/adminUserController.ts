import { RequestHandler } from 'express';
import { literal, Op } from 'sequelize';
import { AdminUsers } from '../models/adminUsers';
import { Encrypt } from '../utils/passwordcrypt';
import tokenGenerate from '../utils/tokenGenerate';

export const createAdminUsers: RequestHandler = async (req, res) => {
  req.body.password = await Encrypt.cryptPassword(req.body.password);
  await AdminUsers.create({...req.body});
  return res
    .status(200)
    .json({message: 'AdminUsers create Successfully'});   
};

export const deleteAdminUsers: RequestHandler = async (req, res,) => {
  const {id} = req.params;
  await AdminUsers.destroy({where: {id}});
  return res.status(200).json({message: 'AdminUsers delete successfully'});
};

export const getAllAdminUsers: RequestHandler = async (req, res) => {
  const {offset, limit } = req.params;
  const { count, rows } = await AdminUsers.findAndCountAll({
    offset: parseInt(offset) ,
    limit: parseInt(limit),
    order: [literal('id desc')]
  }); 
  const data = {rows, count};
  return res.status(200).json({message: 'AdminUsers fetched successfully', data: data});
};

export const getAdminUsersById: RequestHandler = async (req, res) => {
  const {id} = req.params;
  const adminUsers: AdminUsers | null = await AdminUsers.findByPk(id);
  return res.status(200).json({message: 'AdminUsers fetched successfully', data: adminUsers});
};

export const getAdminUsersByEnabled: RequestHandler = async (req, res) => {
  const {status} = req.params;
  const adminUsers: AdminUsers[] | null = await AdminUsers.findAll({where: {enabled: parseInt(status)}});
  return res.status(200).json({message: 'AdminUsers fetched successfully', data: adminUsers});
};

export const getAdminUsersByUserName: RequestHandler = async (req, res) => {
  const {username} = req.params;
  const adminUsers: AdminUsers | null = await AdminUsers.findOne({where: {username: username}});
  return res.status(200).json({message: 'AdminUsers fetched successfully', data: adminUsers});
};

export const getAdminUsersByFullName: RequestHandler = async (req, res) => {
  const {name} = req.params;
  const users: AdminUsers[] | null = await AdminUsers.findAll({
    where:{
      [Op.or]: [
        {
          firstName: {
            [Op.like]:`%${name}%`
          }
        },
        {
          lastName: {
            [Op.like]:`%${name}%`
          }
        }
      ]
    }
  });

  return res.status(200).json({message: 'AdminUsers Searched successfully', data: users});
};

export const updateAdminUsers: RequestHandler = async (req, res) => {
  const {id} = req.params;
  await AdminUsers.update({...req.body}, {where: {id}});
  const adminUsersUpdate: AdminUsers | null = await AdminUsers.findByPk(id);
  return res.status(200).json({message: 'AdminUsers update successfully', data: adminUsersUpdate});
};

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
    
  const loginUser: AdminUsers | null = await AdminUsers.findOne({where: {username: username, enabled: 1}});
 
  if (loginUser) {
    const passValid = await Encrypt.comparePassword(password, loginUser.password);
    if (passValid) {
      tokenGenerate(loginUser, (_error, token, expiresIn) => {
        if (_error) {
          return res.status(401).json({
            message: 'Unable to JWT',
            error: _error
          });
        } else if (token) {
          return res.status(200).json({
            message: 'Auth Successful',
            token,
            userdata: {username:loginUser.username, fullname:`${loginUser.firstName} ${loginUser.lastName}`},
            expiresIn: expiresIn
          });
        }
      });
    } else {
      return res
        .status(500)
        .json({message: 'Bad User Details!'});
    }
  } else {
    return res
      .status(500)
      .json({message: 'Bad User Details!'});
  }
   
};