import "./config/environment-vars";
import "reflect-metadata";

import app from "./app";
import { ReturnType } from "./bootstrap/bootstrap.type";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { KafkaBootstrap } from "./bootstrap/kafka.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { ConsumerService } from "./core/services/consumer.service";
import { ProducerService } from "./core/services/producer.service";

//import "./core/services/rabbitmq.service";
const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();
const kafkaBootstrap = new KafkaBootstrap();

(async () => {
  try {
    await kafkaBootstrap.initialize();

    const instances: ReturnType[] = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
    ];
    await Promise.all(instances);
    console.log("Connected to database");

    // Connection to producer
    await ProducerService.connect();
    // Connection to consumer
    await ConsumerService.connect();
    // Publish message
    await ProducerService.publish("Hello Kafka!");
  } catch (error) {
    console.error(error);
    databaseBootstrap.close();
    serverBootstrap.close();
  }
})();
