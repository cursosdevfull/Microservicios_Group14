import { Channel, Connection, ConsumeMessage } from "amqplib";

import { RabbitmqRepository } from "./rabbitmq.repository";

let connection: Connection;
let channel: Channel;

/* (async () => {
  connection = await connect("amqp://localhost");
  channel = await connection.createChannel();
  console.log("Connected to RabbitMQ");
})(); */

export class RabbitmqService implements RabbitmqRepository {
  async createExchange(exchangeName: string, type: string): Promise<void> {
    channel.assertExchange(exchangeName, type);
  }

  async publish(
    message: string,
    exchangeName: string,
    type: string,
    routingKey?: string
  ): Promise<void> {
    await this.createExchange(exchangeName, type);
    channel.publish(exchangeName, routingKey || "", Buffer.from(message));
  }

  async consume(
    exchangeName: string,
    type: string,
    callback: (message: ConsumeMessage | null) => void,
    routingKeys?: string[]
  ): Promise<void> {
    await this.createExchange(exchangeName, type);

    const assertQueue = await channel.assertQueue("", { exclusive: true });

    if (routingKeys) {
      const bindings = routingKeys.map(async (routingKey) =>
        channel.bindQueue(assertQueue.queue, exchangeName, routingKey)
      );
      await Promise.all(bindings);
    } else {
      await channel.bindQueue(assertQueue.queue, exchangeName, "");
    }

    channel.consume(assertQueue.queue, callback, { noAck: true });
  }
}
