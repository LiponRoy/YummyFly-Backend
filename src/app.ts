// export default app;
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from './middlewares/errorHandler';
import { productRoutes } from "./modules/products/product.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route is working!" });
});

app.use('/api/v1', productRoutes); 

// Error handling middleware
app.use(errorHandler);

export default app;
