import { ConsumeMessage } from "amqplib";

export type RabbitmqRepository = {
  createExchange(exchangeName: string, type: string): Promise<void>;
  publish(
    message: string,
    exchangeName: string,
    type: string,
    routingKey?: string
  ): Promise<void>;
  consume(
    exchangeName: string,
    type: string,
    callback: (message: ConsumeMessage | null) => void,
    routingKeys?: string[]
  ): Promise<void>;
};
