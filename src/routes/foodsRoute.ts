import {Router} from 'express';

import * as foods from '../controllers/foodsController';
import { validateToken } from '../utils/validateToken';

const router = Router();
router.get('/all/:offset/:limit', validateToken, foods.getAllFoods);
router.post('/', validateToken, foods.createFoods);
router.delete('/:id', validateToken, foods.deleteFoods);
router.put('/:id', validateToken, foods.updateFoods);
router.get('/:id', validateToken, foods.getFoodsById);
router.get('/enabled/:status', validateToken, foods.getFoodsByEnabled);
router.get('/name/:name', validateToken, foods.getFoodsByName);
router.get('/sensitivity/:sensitivity', validateToken, foods.getFoodsBySensitivity);

export default router;