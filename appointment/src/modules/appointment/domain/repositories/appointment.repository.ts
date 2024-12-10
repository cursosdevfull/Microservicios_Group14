import { Appointment } from "../appointment";

export type AppointmentRepository = {
  save(appointment: Appointment): Promise<void>;
  saveToDatabase(appointment: Appointment): Promise<void>;
  getAppointmentById(appointmentId: string): Promise<Appointment | null>;
};
