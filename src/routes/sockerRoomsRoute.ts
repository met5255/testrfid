import {Router} from 'express';

import * as socker from '../controllers/socketRoomsController';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit', validateToken, socker.getAllSocketRooms);
router.post('/', validateToken, socker.createSocketRooms);
router.delete('/:id', validateToken, socker.deleteSocketRooms);
router.put('/:id', validateToken, socker.updateSocketRooms);
router.get('/:id', validateToken, socker.getSocketRoomsById);
router.get('/usersinroom/:roomid',  validateToken, socker.getUsersInSocketRoomsByRoomId);
router.get('/enabled/:status', validateToken, socker.getSocketRoomsByEnabled);
router.get('/name/:roomname', validateToken, socker.getSocketRoomsByRoomName);

export default router;
