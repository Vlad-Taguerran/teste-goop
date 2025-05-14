import { Product } from '../../../../domain/entities/Product';

export class ProductMapper {
  static toDomain(raw: any): Product {
    return new Product(raw.name, raw.price, raw.stockQuantity,raw.reservedQuantity, raw._id.toString());
  }
  static toDto(product: Product): any{
    return{
      id: product.id,
      name: product.name,
      stockQuantity: product.stockQuantity - product.reservedQuantity,
      price: product.price
    }
  }

  static toPersistence(product: Product): any {
    return {
      _id: product.id,
      name: product.name,
      price: product.price,
      stockQuantity: product.stockQuantity,
    };
  }
  
}
