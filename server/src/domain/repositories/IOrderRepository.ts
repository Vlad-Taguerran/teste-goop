import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export interface IOrderRepository{
  update(order: Order): Promise<void>;
  findAll(): Promise<Order[]>;
  create(order:Order): Promise<Order>;
  findById(id:string): Promise<Order>;
}