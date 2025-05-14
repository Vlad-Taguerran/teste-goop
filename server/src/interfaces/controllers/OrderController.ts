import { CreateOrderDto } from "../../application/dtos/order/CreateOrderDto";
import { CreateOrderUseCase } from "../../application/usecase/order/CreateOrderUseCase";
import { PaidOrderUseCase } from "../../application/usecase/order/PaidOrderUseCase";
import { ClientRepository } from "../../infra/database/repository/ClientRepository";
import { OrderRepository } from "../../infra/database/repository/OrderRepository";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";
import { Request, Response } from 'express';
import { RabbitMQProducer } from "../../infra/messaging/RabbitMQProducer";
import { ListOrderUseCase } from "../../application/usecase/order/ListOrderUseCase";
import { OrderMapper } from "../../infra/database/mongoDB/mapper/OrderMapper";

export class OrderController {
   private createOrderUseCase: CreateOrderUseCase;
   private paidOrderUseCase: PaidOrderUseCase;
   private listOrdersUseCase: ListOrderUseCase;
    private producer: RabbitMQProducer;
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientRepository: ClientRepository,
    private readonly productRepository: ProductRepository
  ) {
    this.createOrderUseCase = new CreateOrderUseCase(orderRepository,clientRepository,productRepository);
    this.paidOrderUseCase = new PaidOrderUseCase(orderRepository);
    this.listOrdersUseCase = new ListOrderUseCase(orderRepository);
    this.producer = new RabbitMQProducer();
  }

  async createOrder(req:Request, res:Response): Promise<void>{
    const { clientId, itens } = req.body;
   try {
      const dto: CreateOrderDto = { clientId, itens };
     const order = await this.createOrderUseCase.execute(dto);
      this.producer.publish('order.created',order)
      res.status(201).json( OrderMapper.toDTO(order));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  async listOrders(req:Request,res:Response){
    const list = await this.listOrdersUseCase.exec();
    return res.json(list.map(item => OrderMapper.toDTO(item))
);
  }
  async paidOrder(req:Request, res:Response){
    const {orderId} = req.params;
   try {
    const order = await this.paidOrderUseCase.exec(orderId);
   return res.json({message: OrderMapper.toDTO(order)})
   } catch (error) {
    console.log(error)
   }
  }
}