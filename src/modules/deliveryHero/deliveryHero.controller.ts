import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import ApiError from '../../errors/ApiError';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { IDeliveryHero } from './deliveryHero.types';
import { deleveryHeroServices } from './deliveryHero.services';

//  desc Create a new DeliveryHero
//  route POST /api/v1/DeliveryHero

const createDeliveryHero = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const deleveryHeroData: IDeliveryHero = req.body;

    const hero =
      await deleveryHeroServices?.createDeliveryHeroService(deleveryHeroData);

    if (!hero) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Failed to create deleveryHero.',
      );
    }

    sendResponse<IDeliveryHero>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'deleveryHero created successfully',
      data: hero,
    });
  },
);

export const FoodItemController = {
  createDeliveryHero,
};
