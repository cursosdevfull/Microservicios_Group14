import { Consumer } from "kafkajs";

import envs from "../../config/environment-vars";
import { AppointmentApplication } from "../../modules/appointment/application/appointment.application";
import {
  Appointment,
  AppointmentProps,
} from "../../modules/appointment/domain/appointment";
import { AppointmentInfrastructure } from "../../modules/appointment/infrastructure/appointment.infrastructure";
import { MessageBrokerKafka } from "./kafka.service";

export class ConsumerService {
  private static consumer: Consumer;

  static async connect(source: "PE" | "CO" | "MX") {
    this.consumer = await MessageBrokerKafka.connectConsumer();
    this.consumer.subscribe({
      topic: envs[`kafkaTopic${source}`],
      fromBeginning: true,
    });

    this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const repository = new AppointmentInfrastructure();
        const application = new AppointmentApplication(repository);

        const msg = JSON.parse(message.value?.toString());
        const props: AppointmentProps = {
          appointmentId: msg.appointmentId,
          countryIso: msg.countryIso,
          patientId: msg.patientId,
          medicId: msg.medicId,
          scheduleId: msg.scheduleId,
          centerId: msg.centerId,
          status: "COMPLETED",
        };
        console.log("PROPS1", props);
        const appointment = new Appointment(props);
        console.log("PROPERTIES1", appointment.properties());
        await application.save(appointment);
      },
    });
  }
}
