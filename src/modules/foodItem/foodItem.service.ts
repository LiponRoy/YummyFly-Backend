import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Restaurant } from './foodItem.model';
import { IRestaurant } from './foodItem.types';

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

export const FoodItemServices = {
  createRestaurantService,
  getAllRestaurantsService,
};
