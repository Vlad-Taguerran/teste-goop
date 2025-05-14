import { promises } from "dns";
import { Reserve } from "../../../domain/entities/Reserves";
import { IReserveRepository } from "../../../domain/repositories/IReserveRepository";
import { ReserveMapper } from "../mongoDB/mapper/ReserveMapper";
import { ReserveModel } from "../mongoDB/schemas/ReserveSchema";

export class ReserveRepository implements IReserveRepository {
  async create(reserve: Reserve): Promise<void> {
    const doc = ReserveMapper.toPersistence(reserve);
    await ReserveModel.create(doc);
  }

  async findByOrderId(orderId: string): Promise<Reserve | null> {
    const doc = await ReserveModel.findOne({ orderId });
    return doc ? ReserveMapper.toDomain(doc) : null;
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    await ReserveModel.deleteOne({ orderId });
  }

  async update(reserve: Reserve): Promise<void>{
    
    await ReserveModel.findOneAndUpdate({orderId: reserve.orderId},{$set:{completed: reserve.completed}});
  }

  
}
