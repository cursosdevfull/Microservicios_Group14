import { Kafka, logLevel } from "kafkajs";

import envs from "../config/environment-vars";
import { ReturnType, TBootstrap } from "./bootstrap.type";

export class KafkaBootstrap implements TBootstrap {
  private static kafka: Kafka;

  initialize(): ReturnType {
    return new Promise((resolve, reject) => {
      try {
        const { kafkaBroker, clientId } = envs;

        KafkaBootstrap.kafka = new Kafka({
          clientId,
          brokers: [kafkaBroker],
          logLevel: logLevel.INFO,
        });
        resolve(true);
        console.log("Connected to Kafka");
      } catch (error) {
        reject(error);
      }
    });
  }

  static getInstanceKafka() {
    return KafkaBootstrap.kafka;
  }
}
