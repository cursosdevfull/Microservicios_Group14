import { Producer } from "kafkajs";

import envs from "../../config/environment-vars";
import { MessageBrokerKafka } from "./kafka.service";

export class ProducerService {
  private static producer: Producer;

  static async connect() {
    this.producer = await MessageBrokerKafka.connectProducer();
  }

  static async publish(message: object, key: string, dest: "PE" | "CO" | "MX") {
    await this.producer.send({
      topic: envs[`kafkaTopic${dest}`],
      messages: [
        {
          key,
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
