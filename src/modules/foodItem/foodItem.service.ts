import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Restaurant } from './foodItem.model';
import { IRestaurant } from './foodItem.types';
import mongoose from 'mongoose';

// Create a new restaurant in the database
const createRestaurantService = async (
  payload: IRestaurant,
): Promise<IRestaurant> => {
  const newRestaurant = await Restaurant.create(payload);

  if (!newRestaurant) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant not created.');
  }

  return newRestaurant;
};

// Get all restaurants from the database
const getAllRestaurantsService = async () => {
  const restaurants = await Restaurant.find();

  if (!restaurants || restaurants.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurants not found.');
  }

  return restaurants;
};

// Get a single restaurant by ID
const getRestaurantByIdService = async (id: string) => {
  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid restaurant ID format');
  }

  const restaurant = await Restaurant.findById(id);

  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found.');
  }

  return restaurant;
};

export const FoodItemServices = {
  createRestaurantService,
  getAllRestaurantsService,
  getRestaurantByIdService,
};
