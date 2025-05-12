import { model, Schema } from "mongoose";
import { OrderItemSchema } from "./OrderItemSchema";
export interface OrderDocument extends Document {
  clientId: string;
  price?: number;
  stockQuantity?: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  itens:{
  productId: string,
  productName: string,
  quantity: number,
  unityPrice: number
}[];
  orderDate: Date;
  totalAmount: number;
}
const OrderSchema = new Schema({
  _id: { type: String, required: true },
  clientId: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'PAID', 'CANCELLED'], required: true },
  itens: { type: [OrderItemSchema], required: true },
  orderDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true }
});

export const OrderModel = model<OrderDocument>('Orders', OrderSchema);