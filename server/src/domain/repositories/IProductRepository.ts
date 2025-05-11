export interface IProductRepository{
  create(product: Product): Promise<void>
}