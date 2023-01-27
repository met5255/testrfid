import {Router} from 'express';
import { validateToken } from '../utils/validateToken';
import * as AdminUsers from '../controllers/adminUserController';

const router = Router();
router.get('/all/:offset/:limit', validateToken, AdminUsers.getAllAdminUsers);
router.post('/', validateToken, AdminUsers.createAdminUsers);
router.delete('/:id', validateToken, AdminUsers.deleteAdminUsers);
router.put('/:id', validateToken, AdminUsers.updateAdminUsers);
router.get('/:id', validateToken, AdminUsers.getAdminUsersById);
router.get('/enabled/:status', validateToken, AdminUsers.getAdminUsersByEnabled);
router.get('/username/:username', validateToken, AdminUsers.getAdminUsersByUserName);
router.get('/fullname/:name', validateToken, AdminUsers.getAdminUsersByFullName);

router.post('/login', AdminUsers.login);
export default router;