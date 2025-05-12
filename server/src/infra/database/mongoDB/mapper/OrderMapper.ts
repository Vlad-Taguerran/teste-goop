import { Order } from "../../../../domain/entities/Order";
import { OrderItem } from "../../../../domain/entities/OrderItem";
import { OrderProps } from "../../../../domain/types/OrderProps";
import { OrderDocument } from "../schemas/OrderSchema";

export class OrderMapper {
  static toDomain(raw: any): Order {
    const itens = raw.itens.map(item => new OrderItem({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unityPrice: item.unityPrice,
    }));

    const orderProps: OrderProps = {
      clientId: raw.clientId,
      itens,
      status: raw.status,
      orderDate: raw.orderDate,
      totalAmount: raw.totalAmount,
    };

    return new Order(orderProps, raw._id.toString());
  }

  static toPersistence(order: Order): any {
    return {
      _id: order.id,
      clientId: order.props.clientId,
      status: order.props.status,
      orderDate: order.props.orderDate,
      totalAmount: order.props.totalAmount,
      itens: order.props.itens.map(item => ({
        productId: item.props.productId,
        productName: item.props.productName,
        quantity: item.props.quantity,
        unityPrice: item.props.unityPrice,
      })),
    };
  }
}