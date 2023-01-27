import {Router} from 'express';

import * as rfidLogs from '../controllers/rfidLogsController';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit', validateToken, rfidLogs.getAllRfIdLogs);
router.get('/:id', validateToken, rfidLogs.getRfIdLogsById);
router.get('/roomid/:roomid', validateToken, rfidLogs.getRfIdLogsByRoomId);
router.get('/roomname/:roomname', validateToken, rfidLogs.getRfIdLogsByRoomName);
router.get('/userid/:userid', validateToken, rfidLogs.getRfIdLogsByUserId);
router.get('/userrfid/:userrfid', validateToken, rfidLogs.getRfIdLogsByUserRfId);

export default router;
