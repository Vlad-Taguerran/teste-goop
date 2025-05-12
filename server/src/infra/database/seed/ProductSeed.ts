import { v4 } from "uuid";
import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../repository/ProductRepository";

export default async function seedProducts() {
  const productRepository = new ProductRepository();

  const productsToSeed = [
    {
      name: 'Produto A',
      price: 100,
      stockQuantity: 10
    },
    {
      name: 'Produto B',
      price: 200,
      stockQuantity: 5
    },
  ];

  for (const item of productsToSeed) {
    const exists = await productRepository.findByName(item.name);
    if (exists) {
      console.log(`Produto ${item.name} já existe. Pulando...`);
      continue;
    }

    const product = new Product(item.name, item.price, item.stockQuantity, v4());

    try {
      await productRepository.create(product);
      console.log(`Produto ${item.name} criado com sucesso!`);
    } catch (error) {
      console.error(`Erro ao criar produto ${item.name}:`, error);
    }
  }
}

seedProducts().catch(console.error);