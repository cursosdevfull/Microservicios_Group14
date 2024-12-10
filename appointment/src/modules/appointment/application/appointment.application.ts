import { Appointment, STATUS } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {}

  async save(appointment: Appointment): Promise<void> {
    await this.repository.save(appointment);
  }

  async update(appointmentId: string, status: STATUS): Promise<void> {
    const appointment = await this.repository.getAppointmentById(appointmentId);

    if (appointment) {
      appointment.updateStatus(status);
      return this.repository.saveToDatabase(appointment);
    }

    return null;
  }
}
