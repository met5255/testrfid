/* eslint-disable no-console */
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import {theUserIsValid} from '../controllers/getRoomsUsers';
import {SocketLog} from '../utils/socketLog';

export default (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  
  //const rooms = io.of('/').adapter.rooms;
  console.log(SocketLog('green', 'Client connected'));
  socket.on('disconnect', () => {
    console.log(SocketLog('green', 'Client disconnected'));
  });
    
  socket.on('message', async (msg: string) => {
    const messageData =  JSON.parse(JSON.stringify(msg));
    
    console.log(SocketLog('green', `${JSON.stringify(msg)} Get socket Data`));
    if (typeof messageData === 'object') {
      const userIsGood = await theUserIsValid(messageData);
      if (userIsGood.status) {
        socket.join(userIsGood.roomId);
        console.log(SocketLog('green', `${messageData.rfID} Success Access`));
        return socket.to(userIsGood.roomId).emit('isGood', true);
      }
      console.log(SocketLog('green', `${messageData.rfID} Access Failed`));
      return socket.to(userIsGood.roomId).emit('isGood', false);
    }
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(SocketLog('green', 'Client join the Room'));
    /* socket.on('disconnect', () => {
    
    });*/
  });


};