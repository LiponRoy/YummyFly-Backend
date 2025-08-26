import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Restaurant } from './foodItem.model';
import { IRestaurant } from './foodItem.types';
import mongoose from 'mongoose';

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
  const restaurants = await Restaurant.find();

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

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
