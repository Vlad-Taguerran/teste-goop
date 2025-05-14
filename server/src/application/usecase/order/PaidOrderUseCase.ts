import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { RabbitMQProducer } from "../../../infra/messaging/RabbitMQProducer";

export class PaidOrderUseCase {
  private producer: RabbitMQProducer;
  constructor( private orderRepository: IOrderRepository) {
    this.producer = new RabbitMQProducer();
  }

  async exec(id: string){
    const order = await this.orderRepository.findById(id);
    if(!order){
      throw new Error('Pedido não encontrado');
    }
    order.markAsPaid();

    this.orderRepository.update(order);

    this.producer.publish('order.paid',order);
    return order;
  }
}