import { Router } from 'express';
import {
  PaymentOrder,
  PaymentOrderFailed,
  PaymentOrderSuccess,
} from './ssl.controller';

const router = Router();

router.post('/orderPayment/init', PaymentOrder);
router.post('/orderPayment/success/:transId', PaymentOrderSuccess);
router.post('/orderPayment/failed/:transId', PaymentOrderFailed);
// router.post("/orderPayment/canceled/:transId", PaymentOrderCanceled);

export const orderRoutes = router;
