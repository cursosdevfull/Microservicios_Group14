import { Consumer } from "kafkajs";

import { AppointmentApplication } from "../../modules/appointment/application/appointment.application";
import { AppointmentInfrastructure } from "../../modules/appointment/infrastructure/appointment.infrastructure";
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
        const repository = new AppointmentInfrastructure();
        const application = new AppointmentApplication(repository);

        const { appointmentId, status } = JSON.parse(message.value?.toString());
        await application.update(appointmentId, status);
      },
    });
  }
}
