
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../configs/appConfig';
import {AdminRole} from '../models/adminRole';

interface ValidateObj{
  method: string;
  originalUrl: string;
  path?: string;
  userRole: string; 
}


export const validateToken = (req: Request, res: Response, next: NextFunction) => {

  const token: string | undefined = req.headers.authorization?.split(' ')[1];
    
  if (token) {
    jwt.verify(token, config.tokenSecret, async (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error,
          error
        });
      } else {
        
        const { method, path, originalUrl } = req;
        
        const decodeObj = JSON.parse(JSON.stringify(decoded));
        const userRole = await AdminRole.findByPk(decodeObj.userId);


        const validObj = {
          method: method,
          originalUrl: originalUrl,
          path: path,
          userRole: userRole?.dataValues.roleNum
        };

        if (validateRole(validObj)) {
          next();
        } else {
          return res.status(403).json({
            message: 'Permission Error'
          });
        }
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};


const validateRole = (validateObj: ValidateObj) => {

  if (validateObj.method !== 'GET' && validateObj.userRole === '3') {
    return false;
  }

  if (validateObj.method === 'PUT' && validateObj.userRole === '2') {
    return false;
  }

  if (validateObj.method === 'POST' && (validateObj.originalUrl === '/admin/' || validateObj.originalUrl === '/adminrole/') && validateObj.userRole === '2') {
    return false;
  }

  return true;

};