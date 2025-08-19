import { Router } from "express";
import { productController } from "./product.controller";


const router = Router();

router.post("/create", productController.createProduct);
router.get("/all", productController.getAllProducts);

export const productRoutes = router;