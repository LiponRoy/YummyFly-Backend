import { Router } from "express";
import { PaymentOrder,PaymentOrderSuccess } from "./ssl.controller";


const router = Router();

router.post("/orderPayment/init", PaymentOrder);
router.post("/orderPayment/success/:transId", PaymentOrderSuccess);



export const orderRoutes = router;
