import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import ApiError from '../../errors/ApiError';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { FoodItemServices } from './foodItem.service';
import { IRestaurant } from './foodItem.types';

//  desc Create a new restaurant
//  route POST /api/v1/restaurants
//  access Public/Protected (depending on requirement)

const createRestaurant = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const restaurantData: IRestaurant = req.body;

    const newRestaurant =
      await FoodItemServices?.createRestaurant(restaurantData);

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

export const FoodItemController = {
  createRestaurant,
};
