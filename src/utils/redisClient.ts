import { createClient } from 'redis';

let redisClient: ReturnType<typeof createClient>;
let isConnected = false;

export const connectRedis = async () => {
  if (isConnected) return redisClient;

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  await redisClient.connect();
  isConnected = true;

  console.log('✅ Redis Connected..');

  return redisClient;
};

// Optional: helper to get client anywhere
export const getRedisClient = () => {
  if (!isConnected) throw new Error('Redis client not connected');
  return redisClient;
};
