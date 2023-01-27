import {Router} from 'express';

import {
  getInfo,
} from '../controllers/index';


const router = Router();
router.get('/', getInfo);

export default router;