import { Order } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { OrderMapper } from "../mongoDB/mapper/OrderMapper";
import { OrderModel } from "../mongoDB/schemas/OrderSchema";

export class OrderRepository implements IOrderRepository {
  async create(order: Order): Promise<Order> {
   try {
    const newOrder = await OrderModel.create(OrderMapper.toPersistence(order));
    return OrderMapper.toDomain(newOrder);
   } catch (error) {
    console.log(error)
    throw Error('Erro ao processar pedido');
   }
  
}}