import { Product } from "../../../domain/entities/Product";
import { IProductRepository } from "../../../domain/repositories/IProductRepository";
import { ProductMapper } from "../mongoDB/mapper/ProductMapper";
import { ProductModel } from "../mongoDB/schemas/ProductSchema";

export class ProductRepository implements IProductRepository{
 async create(product: Product): Promise<Product | null> {
   const existe  = await ProductModel.findOne({name: product.name});
   if(existe){
    throw new Error('Produto duplicado');
   }

   const p = await ProductModel.create(ProductMapper.toPersistence(product));
   return ProductMapper.toDomain(p);
  }
 async findByIds(ids: string[]): Promise<Product[]> {
  try {
    const products = await ProductModel.find({
      _id: { $in: ids }
    });

    return products.map(productDoc => ProductMapper.toDomain(productDoc));
  } catch (error) {
    console.error('Erro ao buscar produtos por IDs:', error);
    return [];
  }
}
async findByName(name: string): Promise<Product | null> {
    const doc = await ProductModel.findOne({ name });
    return doc ? ProductMapper.toDomain(doc) : null;
  }
  async findAll(): Promise<Product[]>{
try {
    const list = await ProductModel.find();
     const result = list.map(productDoc => {
    return ProductMapper.toDomain(productDoc);
  });

    return result;
  } catch (error) {
    console.error('Erro ao buscar todos os produtos:', error);
    return [];
  }
  }
}