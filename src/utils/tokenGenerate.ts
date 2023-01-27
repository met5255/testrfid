/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import {config} from '../configs/appConfig';
import { AdminUsers }  from '../models/adminUsers';

const tokenGenerate = (user: AdminUsers, callback: (error: Error | null, token: string | null, expiresIn: any | null) => void): void => {
  const nwDate = new Date();
  const expDate = nwDate.setHours(nwDate.getHours() + 8);
  try {        
    jwt.sign(
      {
        username: user.username,
        userId: user.id
      },
      config.tokenSecret,
      {
        issuer: config.tokenSecret,
        algorithm: 'HS256',
        expiresIn:  '8h',
      },
      (error, token) => {
        if (error) {
          callback(error, null, null);
        } else if (token) {
          callback(null, token, expDate);
        }
      }
    );
  } catch (error: any) {
    callback(error, null, null);
  }
};

export default tokenGenerate;