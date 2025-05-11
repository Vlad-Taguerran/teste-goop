import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

class OrderRepository implements IOrderRepository {
  create(order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}