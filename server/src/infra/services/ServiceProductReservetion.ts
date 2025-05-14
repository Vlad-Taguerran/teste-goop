import { OrderItem } from "../../domain/entities/OrderItem";
import { ProductModel } from "../database/mongoDB/schemas/ProductSchema";
import { ReserveModel } from "../database/mongoDB/schemas/ReserveSchema";


export class serviceReserver{
  constructor(){

  }
  async reserver(orderId:string, itens: OrderItem[]){
    const reservedItems = [];
    for(const item of itens){
      const product = await ProductModel.findById(item.props.productId);
        if (!product) {
        console.error(`Produto ${item.props.productId} não encontrado`);
        continue;
      }

      const available = product.stockQuantity - product.reservedQuantity;
      if (available < item.props.quantity) {
        console.error(`Estoque insuficiente para o produto ${product.name}`);
        continue;
      }

      product.reservedQuantity += item.props.quantity;
      await product.save();

       reservedItems.push({
        productId: product.id,
        quantity: item.props.quantity
      });

      console.log(`[✓] Reservado ${item.props.quantity}x ${product.name}`)
    }
    
    if (reservedItems.length > 0) {
      const reservado = await ReserveModel.create({
        orderId,
        items: reservedItems
      });
      console.log("Reservado com sucesso:", reservado);
    }
  
  }
}