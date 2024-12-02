import { Consumer } from "kafkajs";

import envs from "../../config/environment-vars";
import { MessageBrokerKafka } from "./kafka.service";

export class ConsumerService {
  private static consumer: Consumer;

  static async connect() {
    this.consumer = await MessageBrokerKafka.connectConsumer();
    this.consumer.subscribe({ topic: envs.kafkaTopic, fromBeginning: true });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          value: message.value?.toString(),
        });
      },
    });
  }
}
