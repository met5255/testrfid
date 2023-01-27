import {Router} from 'express';

import * as rfidList from '../controllers/rfidListController';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit',  validateToken, rfidList.getAllRfidList);
router.post('/', validateToken, rfidList.createRfidList);
router.delete('/:id', validateToken, rfidList.deleteRfidList);
router.put('/:id', validateToken, rfidList.updateRfidList);
router.get('/:id', validateToken, rfidList.getRfidListById);
router.get('/enabled/:status', validateToken, rfidList.getRfidListByEnabled);
router.get('/rfid/:rfid', validateToken, rfidList.getRfidListByRfid);
router.get('/userid/:userid', validateToken, rfidList.getRfidListByUserId);

export default router;