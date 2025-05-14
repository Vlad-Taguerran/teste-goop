import { RabbitMQConnection } from './RabbitMQConnection';

export class RabbitMQProducer {
  async publish(queue: string, payload: object) {
    const channel = await RabbitMQConnection.getChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
    console.log(`[x] Mensagem enviada para fila ${queue}`);
  }
}
