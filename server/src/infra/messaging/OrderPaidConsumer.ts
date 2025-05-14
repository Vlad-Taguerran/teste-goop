import { Order } from '../../domain/entities/Order';
import { ServiceOrderPaid } from '../services/ServiceOrderPaid';

import { RabbitMQConnection } from './RabbitMQConnection';

export async function startOrderPaidConsumer() {
  
  const orderPaidService = new ServiceOrderPaid();
  const channel = await RabbitMQConnection.getChannel();
  const queue = 'order.paid';

  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    if (msg) {
      const data : Order = JSON.parse(msg.content.toString());
      console.log(`[>] Pedido pago: ${data.id}`);
      const result = await orderPaidService.orderPaid(data);
      if(result == 0){
        return channel.ack(msg);
      }
      channel.ack(msg);
    }
  });

  console.log(`[✓] Consumindo da fila ${queue}`);
}
