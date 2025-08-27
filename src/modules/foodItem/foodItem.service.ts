import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Restaurant } from './foodItem.model';
import { IRestaurant } from './foodItem.types';
import mongoose from 'mongoose';
import { getRedisClient } from '../../utils/redisClient';

// create a new restaurant in the database
// param payload - Restaurant data
// returns The created restaurant document

const createRestaurantService = async (
  payload: IRestaurant,
): Promise<IRestaurant> => {
  const newRestaurant = await Restaurant.create(payload);

  if (!newRestaurant) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant not created.');
  }

  return newRestaurant;
};

// Getting all restaurants from the database
// returns An array of restaurant documents
const getAllRestaurantsService = async () => {
  const CACHE_KEY = `${process.env.REDIS_CACHE_KEY_PREFIX}:restaurants`;
  const TTL = parseInt(process.env.REDIS_TTL || '60', 10); // seconds
  const start = Date.now(); // measure request time

  // Get Redis client
  const redis = await getRedisClient();

  // Check cache
  const cachedData: any = await redis.get(CACHE_KEY);

  if (cachedData) {
    console.log('🚀 Cache HIT');
    console.log(`⏱ Redis fetch took: ${Date.now() - start}ms`);

    const restaurants = JSON.parse(cachedData);

    return restaurants;
  }

  console.log('🐢 Cache MISS');

  // Fetch from DB
  const restaurants = await Restaurant.find();

  if (!restaurants || restaurants.length === 0) {
    throw new ApiError(404, 'Restaurants not found');
  }
  // Cache the data
  await redis.setEx(CACHE_KEY, TTL, JSON.stringify(restaurants));

  console.log(`⏱ DB fetch + cache set took: ${Date.now() - start}ms`);

  return restaurants;
};

// Getting all restaurants from the database
// returns a single restaurant documents
const getRestaurantByIdService = async (id: string) => {
  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, 'Invalid restaurant ID format');
  }

  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    return null;
  }

  return restaurant;
};

export const FoodItemServices = {
  createRestaurantService,
  getAllRestaurantsService,
  getRestaurantByIdService,
};
