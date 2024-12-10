import { Appointment } from "../appointment";

export type AppointmentRepository = {
  save(appointment: Appointment): Promise<void>;
};
