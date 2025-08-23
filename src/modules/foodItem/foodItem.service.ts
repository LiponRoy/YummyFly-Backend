import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Restaurant } from './foodItem.model';
import { IRestaurant } from './foodItem.types';

// create a new restaurant in the database
// param payload - Restaurant data
// returns The created restaurant document

const createRestaurant = async (payload: IRestaurant): Promise<IRestaurant> => {
  const newRestaurant = await Restaurant.create(payload);

  if (!newRestaurant) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant not created.');
  }

  return newRestaurant;
};

export const FoodItemServices = {
  createRestaurant,
};
