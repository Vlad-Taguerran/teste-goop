import { Schema, model } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  stockQuantity: number;
  reservedQuantity: number;
}

const ProductSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, unique: true},
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  reservedQuantity: {
  type: Number,
  required: true,
  default: 0,
},
});

export const ProductModel = model<ProductDocument>('Product', ProductSchema);