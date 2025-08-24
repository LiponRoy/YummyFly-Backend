import { Router } from 'express';
import { FoodItemController } from './foodItem.controller';

const router = Router();

router.post('/create', FoodItemController.createRestaurant);

export const restaurantRoutes = router;
