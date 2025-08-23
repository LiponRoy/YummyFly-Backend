// export default app;
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product.route';
import { orderRoutes } from './modules/SSLPayment/ssl.route';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Test route is working!' });
});

app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

// error middleware ...
app.use(globalErrorHandler);

export default app;
