import { Schema } from "mongoose";

export const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unityPrice: { type: Number, required: true },
}, { _id: false });