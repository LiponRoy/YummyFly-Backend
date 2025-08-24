// export default app;
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product.route';
import { orderRoutes } from './modules/SSLPayment/ssl.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { restaurantRoutes } from './modules/foodItem/foodItem.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Test route is working!' });
});

app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);

// error middleware ...
app.use(globalErrorHandler);

export default app;
