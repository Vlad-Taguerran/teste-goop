import { Order } from "../../../domain/entities/Order";
import { Product } from "../../../domain/entities/Product";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { OrderMapper } from "../mongoDB/mapper/OrderMapper";
import { OrderModel } from "../mongoDB/schemas/OrderSchema";

export class OrderRepository implements IOrderRepository {
 async  findAll(): Promise<Order[]> {
    const orderList = await OrderModel.find();
    
    return orderList.map(order => OrderMapper.toDomain(order));
  }
  async findById(id: string): Promise<Order> {
   const doc =  await OrderModel.findById(id);
   return OrderMapper.toDomain(doc);
  }
   async update(order: Order): Promise<void> {
    try {
         await OrderModel.updateOne({ _id: order.id }, {
      $set: { status: order.status }
    });
    } catch (error) {
      console.log(error)
    }
  }
  async create(order: Order): Promise<Order> {
   try {
    const newOrder = await OrderModel.create(OrderMapper.toPersistence(order));
    return OrderMapper.toDomain(newOrder);
   } catch (error) {
    throw Error('Erro ao processar pedido');
   }

  
}}