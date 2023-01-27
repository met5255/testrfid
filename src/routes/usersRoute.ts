import {Router} from 'express';

import * as users from '../controllers/usersController';
import * as usertoroom from '../controllers/userRoomConnector';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit', validateToken, users.getAllUsers);
router.post('/', validateToken, users.createUser);
router.post('/usertoroom/', validateToken, usertoroom.createUserToRoom);
router.delete('/usertoroom/:id', validateToken, usertoroom.deleteUserfromRoom);
router.delete('/:id', validateToken, users.deleteUser);
router.put('/:id', validateToken, users.updateUser);
router.get('/:id', validateToken, users.getUserById);
router.get('/rfid/:rfid', validateToken, users.getUserByRFID);
router.get('/enabled/:status', validateToken, users.getUserByEnabled);
router.get('/zipcode/:zipcode', validateToken, users.getUserByZipCode);
router.get('/country/:country', validateToken, users.getUserByCountry);
router.get('/searchname/:name', validateToken, users.getUserByFullName);

export default router;