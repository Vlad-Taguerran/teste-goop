import { channel } from "diagnostics_channel";
import { ProductRepository } from "../database/repository/ProductRepository";
import { ReserveRepository } from "../database/repository/ReserveRepository";
import { Order } from "../../domain/entities/Order";

export class ServiceOrderPaid{
  private reserveRepository: ReserveRepository;
  private productRepository: ProductRepository;
  constructor(){
 this.reserveRepository = new ReserveRepository(),
  this.productRepository = new ProductRepository()
  }
  async orderPaid(data: Order){
    
      const orderReserve = await this.reserveRepository.findByOrderId(data.id);
      console.log(orderReserve)
     if(!orderReserve){
      console.log('Reserva não encontrada');
      return 0;
     }
       for (const item of orderReserve.items) {
        console.log('itens dareserva',item)
        await this.productRepository.decreaseStock(item.productId, item.quantity);
      }
      orderReserve.completedReserve();
      await this.reserveRepository.update(orderReserve);
  }
}