import { v4 } from "uuid";
import { OrderItem } from "../../../domain/entities/OrderItem";
import { Product } from "../../../domain/entities/Product";
import { IClientRepository } from "../../../domain/repositories/IClientRepository";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { CreateOrderDto } from "../../dtos/order/CreateOrderDto";
import { IOrderRepository } from "./../../../domain/repositories/IOrderRepository";
import { OrderProps, OrderStatus } from "../../../domain/types/OrderProps";
import { Order } from "../../../domain/entities/Order";
import { RabbitMQProducer } from "../../../infra/messaging/RabbitMQProducer";
export class CreateOrderUseCase {
 
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
    private productRepository: IProductRepository) {
      
    }

  async execute(dto: CreateOrderDto){
   
    const client = await this.clientRepository.findById(dto.clientId);
    if(!client){
      throw new Error('Client not found');
    }
    const productIds = dto.itens.map(item => item.productId);
    const products = await this.productRepository.findByIds(productIds);
      if (products.length !== productIds.length) {
            const foundProductIds = products.map(p => p.id);
            const notFoundIds = productIds.filter(id => !foundProductIds.includes(id));
            throw new Error(`Produtos não encontrados: ${notFoundIds.join(', ')}`);
        }
    const productMap = new Map<string, Product>();
    products.forEach(p => productMap.set(p.id,p));
    
    const orderItems: OrderItem[] =[];
    for (const itemInput of dto.itens) {
            const product = productMap.get(itemInput.productId);
            if (itemInput.quantity <= 0) {
                 throw new Error(`Quantidade inválida para o produto ${itemInput.productId}: ${itemInput.quantity}.`);
            }
            if(product?.reservedQuantity === product?.stockQuantity){
              throw new Error(`Produto Esgotado`)
            }
            orderItems.push(new OrderItem({
                productId: product!.id, 
                productName: product!.name,
                quantity: itemInput.quantity,
                unityPrice: product!.price,
            }));
        };

        const orderProps: OrderProps = {
            clientId: dto.clientId,
            status: OrderStatus.PENDING,
            itens: orderItems,
            orderDate: new Date(), 
            totalAmount: 0, 
        };

       const order = new Order(orderProps,v4());
      
  const orderSaved = await this.orderRepository.create(order);
  
   return orderSaved;
  }
}
