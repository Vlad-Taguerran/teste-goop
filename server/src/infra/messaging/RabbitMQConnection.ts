import amqp, { Channel, Connection } from 'amqplib';

export class RabbitMQConnection {
  private static connection: Connection;
  private static channel: Channel;

  public static async getConnection(): Promise<Connection> {
        const urli = process.env.RABBITMQ_URL || 'amqp://user:password@localhost'
    if (!this.connection) {
      this.connection = await amqp.connect(urli);
    }
    return this.connection;
  }

  public static async getChannel(): Promise<Channel> {
    if (!this.channel) {
      const connection = await this.getConnection();
      this.channel = await connection.createChannel();
    }
    return this.channel;
  }

  
}
