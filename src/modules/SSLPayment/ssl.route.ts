import { Router } from "express";
import { PaymentOrder } from "./ssl.controller";


const router = Router();

router.post("/orderPayment/init", PaymentOrder);


export const orderRoutes = router;
