import { Order } from '../../domain/entities/Order';
import { serviceReserver } from '../services/ServiceProductReservetion';
import { RabbitMQConnection } from './RabbitMQConnection';

export async function startOrderCreatedConsumer() {
  const serviceReserve = new serviceReserver();
  const channel = await RabbitMQConnection.getChannel();
  const queue = 'order.created';

  await channel.assertQueue(queue);
  channel.consume(queue, async (msg) => {
    if (msg) {
      const data: Order = JSON.parse(msg.content.toString());
      console.log(`[>] Pedido recebido: ${data.props.itens.map(item => item.props.productName)}`);
      await serviceReserve.reserver(data.id,data.props.itens)
      
      channel.ack(msg);
    }
  });

  console.log(`[✓] Consumindo da fila ${queue}`);
}
