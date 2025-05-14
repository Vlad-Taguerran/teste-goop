import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";

export class ListOrderUseCase {
  constructor(private orderRepository: IOrderRepository) { 
  }

  async exec(){
    try {
      
   const orders = this.orderRepository.findAll();
   return orders;
    } catch (error) {
      throw new Error('Erro ao busc')
    }
  }
}