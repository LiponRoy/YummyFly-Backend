import { Schema, model} from "mongoose";
import { IOrder } from "./ssl.interface";

const orderSchema = new Schema<IOrder>(
  {
    tran_id: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "BDT" },
    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED", "CANCELLED"],
      default: "INITIATED",
    },
    cus_name: { type: String, required: true },
    cus_email: { type: String, required: true },
    total_product: { type: Number, required: true },
    total_price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
