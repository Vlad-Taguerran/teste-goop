import { Order } from "../entities/Order";
import { Product } from "../entities/Product";

export interface IProductRepository{
  create(product: Product): Promise<Product | null> ;
  findByIds(ids: string[]): Promise<Product[]>
  update(order: Order): Promise<Product>;
}