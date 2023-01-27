import {Router} from 'express';
import { validateToken } from '../utils/validateToken';
import * as AdminRole from '../controllers/adminRoleController';

const router = Router();
router.post('/', validateToken, AdminRole.createAdminRole);
router.delete('/:id', validateToken, AdminRole.deleteAdminRole);
router.get('/all/:offset/:limit', validateToken, AdminRole.getAllAdminRole);
router.get('/:adminid', validateToken, AdminRole.getAdminRoleByadminId);
router.get('/userrole/:id', validateToken, AdminRole.getAdminRoleById);
router.put('/:id', validateToken, AdminRole.updateAdminRole);

export default router;