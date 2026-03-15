import { Router } from 'express';
import { DeliveryHeroController } from './deliveryHero.controller';

const router = Router();

router.post('/create', DeliveryHeroController.createDeliveryHero);

export const deliveryHeroRoutes = router;
