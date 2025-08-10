// export default app;
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Test route is working!" });
});

// Error handling middleware
app.use(errorHandler);

export default app;
