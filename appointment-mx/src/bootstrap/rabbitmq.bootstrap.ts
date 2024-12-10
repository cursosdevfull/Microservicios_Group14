import amqp from "amqplib";

import envs from "../config/environment-vars";
import { ReturnType, TBootstrap } from "./bootstrap.type";

export class RabbitmqBootstrap implements TBootstrap {
  static channel: amqp.Channel;
  connection!: amqp.Connection;

  initialize(): ReturnType {
    return new Promise(async (resolve, reject) => {
      const host = `amqp://${envs.rabbitmqHost}`;

      try {
        const connection = await amqp.connect(host);
        this.connection = connection;
        RabbitmqBootstrap.channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");
        resolve(true);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  close() {
    this.connection?.close();
  }
}
