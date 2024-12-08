import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ProducerService } from "../../../core/services/producer.service";
import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { AppointmentEntity } from "./entities/appoinment.entity";

export class AppointmentInfrastructure implements AppointmentRepository {
  async save(appointment: Appointment): Promise<void> {
    await this.saveToDatabase(appointment);
    await this.publish(appointment);
  }

  async saveToDatabase(appointment: Appointment): Promise<void> {
    const props = appointment.properties();

    const repository =
      DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);
    const entity = new AppointmentEntity();
    entity.centerId = props.centerId;
    entity.countryIso = props.countryIso;
    entity.patientId = props.patientId;
    entity.scheduleId = props.scheduleId;
    entity.status = props.status;
    entity.createdAt = props.createdAt;
    entity.medicId = props.medicId;
    entity.appointmentId = props.appointmentId;

    await repository.save(entity);
  }

  async publish(appointment: Appointment): Promise<void> {
    ProducerService.publish(
      appointment.properties(),
      "appoinment-completed",
      appointment.properties().countryIso
    );
  }
}
