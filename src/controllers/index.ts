import { RequestHandler } from 'express';

export const getInfo: RequestHandler = async (_, res) => {
  return res
    .status(200)
    .send('ESP RFID Websocket Conncector');
};
