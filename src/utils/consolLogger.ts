/* eslint-disable no-console */
/*eslint-disable no-mixed-operators*/
import { Request, Response, NextFunction } from 'express';

import { dateFormatter } from './dateFormatter';

export const colorTerminal = (color:string, value:string) => {
  let colors = '';
  switch (color) {
    case 'red':
      colors = '\x1b[31m';
      break;
    case 'green':
      colors = '\x1b[32m';
      break;
    case 'blue':
      colors = '\x1b[34m';  
      break;
    case 'yellow':
      colors = '\x1b[33m';
      break;
    case 'cyan':
      colors = '\x1b[36m';
      break;
    default:
      //white
      colors = '\x1b[37m';
      break;
  }
  colors += `${value}\x1b[0m`;
  return colors;
};

const getActualRequestDurationInMilliseconds = (start: [number, number] | undefined) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl !== '/isvalid') {
    if (req.method !== 'OPTIONS') {
      const { method } = req;
      const { url } = req;
      const { statusCode } = res;
      const start = process.hrtime();
      const durationMillis = getActualRequestDurationInMilliseconds(start);
          
      const strtTime = colorTerminal('red',`[${dateFormatter(new Date().getTime(), true)}]`);
      const methodUrl = colorTerminal('yellow',`${method}:${url}`);
      const status = colorTerminal('green',`${statusCode}`);
      const leftTime = colorTerminal('cyan',`${durationMillis.toLocaleString()}ms`);
      const ip = colorTerminal('blue',`[${req.headers['x-forwarded-for'] || req.socket.remoteAddress}]`);  
      console.log(`${ip} ${strtTime}  ${methodUrl}  ${status}  ${leftTime}`);
    }
  }
  next();
};