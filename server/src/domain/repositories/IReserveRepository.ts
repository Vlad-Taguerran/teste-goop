import { Reserve } from "../entities/Reserves";

export interface IReserveRepository {
  create(reserve: Reserve): Promise<void>;
  findByOrderId(orderId: string): Promise<Reserve | null>;
  update(reserve: Reserve): Promise<void>
  deleteByOrderId(orderId: string): Promise<void>;
}
