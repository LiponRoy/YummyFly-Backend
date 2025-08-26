import { Router } from 'express';
import { FoodItemController } from './foodItem.controller';

const router = Router();

router.post('/create', FoodItemController.createRestaurant);
router.get('/all', FoodItemController.getAllRestaurants);

export const restaurantRoutes = router;
