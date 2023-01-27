import {Router} from 'express';

import * as foodsSensitivity  from '../controllers/foodsSensivityController';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit', validateToken, foodsSensitivity.getAllFoodsSensitivity);
router.post('/', validateToken, foodsSensitivity.createFoodsSensitivity);
router.delete('/:id', validateToken, foodsSensitivity.deleteFoodsSensitivity);
router.put('/:id', validateToken, foodsSensitivity.updateFoodsSensitivity);
router.get('/:id', validateToken, foodsSensitivity.getFoodsSensitivityById);
router.get('/enabled/:status', validateToken, foodsSensitivity.getFoodsSensitivityByEnabled);
router.get('/name/:name', validateToken, foodsSensitivity.getFoodsSensitivityByName);

export default router;