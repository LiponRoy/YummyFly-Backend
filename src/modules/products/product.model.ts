import { model, Schema } from "mongoose";
import { IProduct } from "./product.types";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);
export default Product;