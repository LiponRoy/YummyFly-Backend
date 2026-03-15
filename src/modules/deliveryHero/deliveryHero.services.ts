import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import mongoose from 'mongoose';
import { IDeliveryHero } from './deliveryHero.types';
import { DeliveryHeroModel } from './deliveryHero.model';

// createDeliveryHero
const createDeliveryHeroService = async (
  payload: IDeliveryHero,
): Promise<IDeliveryHero> => {
  const DeliveryHero = await DeliveryHeroModel.create(payload);

  if (!DeliveryHero) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'DeliveryHero not created.');
  }

  return DeliveryHero;
};

export const deleveryHeroServices = {
  createDeliveryHeroService,
};
