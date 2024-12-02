import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {}

  async save(appointment: Appointment): Promise<void> {
    await this.repository.save(appointment);
  }
}
