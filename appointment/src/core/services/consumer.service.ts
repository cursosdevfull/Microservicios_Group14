import { Consumer } from "kafkajs";

import { MessageBrokerKafka } from "./kafka.service";

export class ConsumerService {
  private static consumer: Consumer;

  static async connect(source: string) {
    this.consumer = await MessageBrokerKafka.connectConsumer();
    this.consumer.subscribe({
      topic: source,
      fromBeginning: true,
    });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("====================================");
        console.log({
          topic,
          partition,
          value: message.value?.toString(),
        });
      },
    });
  }
}
