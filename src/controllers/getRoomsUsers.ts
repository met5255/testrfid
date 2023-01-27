
import { Users } from '../models/users';
import { UserRommConnector } from '../models/userRoomConnector';
import { SocketRooms } from '../models/socketRooms';
import { RfIdLogs } from '../models/rfidLogs';

interface wsObj {
    rfID: string,
    wsRoom: string
}

interface LogObj {
    roomId: number,
    userId: number,
    roomName: string,
    userRfId: string,
    status: number,
    date: string
}

export const theUserIsValid = async(obj:wsObj) => {
  const socketRooms: SocketRooms | null = await SocketRooms.findOne({where: {roomName: obj.wsRoom, enabled: 1}});
  const userData: Users | null = await Users.findOne({where: {rfId: obj.rfID, enabled: 1}});
  const userRommConnector: UserRommConnector | null = await UserRommConnector.findOne({where: {roomId: socketRooms?.dataValues.id | 0, userId:userData?.dataValues.id | 0 }});
  const logObj : LogObj = {
    roomId: socketRooms?.dataValues.id | 0,
    userId: userData?.dataValues.id | 0,
    roomName: obj.wsRoom,
    userRfId: obj.rfID,
    status: 0,
    date: new Date().toString()
  };

  if (userRommConnector?.dataValues === undefined) {
    await RfIdLogs.create({...logObj});
    return {status:false, roomId: socketRooms?.dataValues.id};
  }

  logObj.status = 1;
  await RfIdLogs.create({...logObj});
  return {status:true, roomId: socketRooms?.dataValues.id};
};
