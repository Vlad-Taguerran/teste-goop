import { OrderItem } from "../../../domain/entities/OrderItem";
import { CreateOrderItemDto } from "../orderItem/CreateOrderItemDto";

export interface CreateOrderDto{
  clientId: string;
  itens: CreateOrderItemDto[];
}