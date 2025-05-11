export interface IOrderRepository{
  create(order:Order): Promise<void>;
}