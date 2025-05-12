import { Product } from '../../../../domain/entities/Product';

export class ProductMapper {
  static toDomain(raw: any): Product {
    return new Product(raw.name, raw.price, raw.stockQuantity, raw._id.toString());
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
