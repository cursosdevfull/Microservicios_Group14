import { Producer } from "kafkajs";

import { MessageBrokerKafka } from "./kafka.service";

export class ProducerService {
  private static producer: Producer;

  static async connect() {
    this.producer = await MessageBrokerKafka.connectProducer();
  }

  static async publish(message: object, key: string, topic: string) {
    await this.producer.send({
      topic,
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
