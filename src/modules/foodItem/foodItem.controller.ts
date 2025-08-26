import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import ApiError from '../../errors/ApiError';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { FoodItemServices } from './foodItem.service';
import { IRestaurant } from './foodItem.types';
import mongoose from 'mongoose';

//  desc Create a new restaurant
//  route POST /api/v1/restaurants
//  access Public/Protected (depending on requirement)

const createRestaurant = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const restaurantData: IRestaurant = req.body;

    const newRestaurant =
      await FoodItemServices?.createRestaurantService(restaurantData);

    if (!newRestaurant) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create restaurant.',
      );
    }

    sendResponse<IRestaurant>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Restaurant created successfully',
      data: newRestaurant,
    });
  },
);

const getAllRestaurants = catchAsync(async (req: Request, res: Response) => {
  const restaurants = await FoodItemServices.getAllRestaurantsService();

  if (!restaurants) {
    throw new ApiError(404, 'Restaurants not found');
  }

  return sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Restaurants fetched successfully',
    data: restaurants,
  });
});

// Get a restaurant by ID
export const getRestaurantById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const restaurant = await FoodItemServices.getRestaurantByIdService(id);

    // If not found
    if (!restaurant) {
      throw new ApiError(400, 'Restaurant not found.');
    }

    // Success
    return sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Restaurant retrieved successfully.',
      data: restaurant,
    });
  },
);

export const FoodItemController = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
};
