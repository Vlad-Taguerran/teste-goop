import { CreateOrderDto } from "../../application/dtos/order/CreateOrderDto";
import { CreateOrderUseCase } from "../../application/usecase/order/CreateOrderUseCase";
import { ClientRepository } from "../../infra/database/repository/ClientRepository";
import { OrderRepository } from "../../infra/database/repository/OrderRepository";
import { ProductRepository } from "../../infra/database/repository/ProductRepository";
import { Request, Response } from 'express';

export class OrderController {
   private createOrderUseCase: CreateOrderUseCase;
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientRepository: ClientRepository,
    private readonly productRepository: ProductRepository
  ) {
    this.createOrderUseCase = new CreateOrderUseCase(orderRepository,clientRepository,productRepository);
  }

  async createOrder(req:Request, res:Response): Promise<void>{
    const { clientId, itens } = req.body;
   try {
      const dto: CreateOrderDto = { clientId, itens };
     const order = await this.createOrderUseCase.execute(dto);
      res.status(201).json({ message: 'Pedido criado com sucesso', order: order });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}