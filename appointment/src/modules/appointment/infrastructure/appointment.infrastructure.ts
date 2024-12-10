import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ProducerService } from "../../../core/services/producer.service";
import {
  Appointment,
  AppointmentProps,
  COUNTRY_ISO,
  STATUS,
} from "../domain/appointment";
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

    if (props.updatedAt) {
      entity.updatedAt = props.updatedAt;
    }

    await repository.save(entity);
  }

  async publish(appointment: Appointment): Promise<void> {
    ProducerService.publish(
      appointment.properties(),
      "appoinment-created",
      appointment.properties().countryIso
    );
  }

  async getAppointmentById(appointmentId: string): Promise<Appointment | null> {
    const repository =
      DatabaseBootstrap.dataSource.getRepository(AppointmentEntity);

    const entity = await repository.findOne({ where: { appointmentId } });
    if (entity) {
      const props: AppointmentProps = {
        appointmentId: entity.appointmentId,
        countryIso: entity.countryIso as COUNTRY_ISO,
        patientId: entity.patientId,
        medicId: entity.medicId,
        scheduleId: entity.scheduleId,
        centerId: entity.centerId,
        status: entity.status as STATUS,
        createdAt: entity.createdAt,
      };
      return new Appointment(props);
    }

    return null;
  }
}
