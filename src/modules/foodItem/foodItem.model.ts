// models/Restaurant.ts
import { Schema, Document, model } from 'mongoose';
import { IFoodItem, IMoreInfo, IRestaurant } from './foodItem.types';

const FoodsSchema: Schema = new Schema<IFoodItem>({
  id: Number,
  name: String,
  description: String,
  price: Number,
  category: String,
  isAvailable: Boolean,
  isVeg: Boolean,
  calories: Number,
  imageUrl: String,
  cartQuantity: Number,
});

const MoreInfoSchema = new Schema<IMoreInfo>({
  imageUrl: String,
  fullLocation: String,
  aboutDeliveryFee: String,
  aboutMinimumOrder: String,
  OpeningHours: [String],
});

const RestaurantSchema: Schema = new Schema<IRestaurant>({
  id: Number,
  restaurantName: {
    type: String,
    required: true,
    unique: true, // ✅ makes it unique
  },
  location: String,
  rating: Number,
  ratingPersons: Number,
  deliveryFee: Number,
  deliveryTime: String,
  distance: Number,
  cuisines: [String],
  discountPercent: Number,
  minimumOrder: Number,
  isOpen: Boolean,
  imageUrl: String,
  moreInfo: MoreInfoSchema,
  foods: [FoodsSchema],
});
export const Restaurant = model<IRestaurant>('Restaurant', RestaurantSchema);
