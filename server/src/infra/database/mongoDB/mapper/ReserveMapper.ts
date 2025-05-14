import { Reserve, ReserveItem } from '../../../../domain/entities/Reserves';
import { ReserveDocument } from '../schemas/ReserveSchema';

export class ReserveMapper {
  static toDomain(doc: ReserveDocument): Reserve {
    return new Reserve(
      doc.orderId,
      doc.items.map(item => new ReserveItem(item.productId, item.quantity)),
      doc.createdAt,
      doc.expiresAt,
      doc.completed
    );
  }

  static toPersistence(reserve: Reserve) {
    return {
      orderId: reserve.orderId,
      items: reserve.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      createdAt: reserve.createdAt,
      expiresAt: reserve.expiresAt,
    };
  }
}
