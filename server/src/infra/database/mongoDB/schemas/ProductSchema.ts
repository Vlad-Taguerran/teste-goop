import { Schema, model } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stockQuantity: number;
}

const ProductSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true }
});

export const ProductModel = model<ProductDocument>('Product', ProductSchema);