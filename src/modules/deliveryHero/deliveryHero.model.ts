import { IDeliveryHero } from './deliveryHero.types';
import { Document, Schema, model } from 'mongoose';

interface DeliveryHeroDocument extends IDeliveryHero, Document {}

const DeliveryHeroSchema = new Schema<DeliveryHeroDocument>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ['bicycle', 'motorcycle', 'car'],
      required: [true, 'Vehicle type is required'],
    },
    isOver18: {
      type: Boolean,
      required: [true, 'Age confirmation is required'],
    },
  },
  {
    timestamps: true,
  },
);

const DeliveryHeroModel = model<DeliveryHeroDocument>(
  'DeliveryHero',
  DeliveryHeroSchema,
);

export { IDeliveryHero, DeliveryHeroDocument, DeliveryHeroModel };
