import app from './app';
import config from './config';
import { connectDB } from './utils/connectDB';
import { connectRedis } from './utils/redisClient';

const startServer = async () => {
  await connectDB();

  // Redis connection
  await connectRedis();

  app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
  });
};

startServer();
