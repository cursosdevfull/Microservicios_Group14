import { Request, Response } from "express";

import { AppointmentApplication } from "../../application/appointment.application";
import { Appointment, AppointmentProps } from "../../domain/appointment";

export class AppointmentController {
  constructor(private readonly application: AppointmentApplication) {}

  async create(request: Request, response: Response) {
    const { countryIso, patientId, medicId, scheduleId, centerId } =
      request.body;

    const props: AppointmentProps = {
      countryIso,
      patientId,
      medicId,
      scheduleId,
      centerId,
    };

    const appointment = new Appointment(props);
    console.log("appointment", appointment);
    await this.application.save(appointment);

    response.status(204).send();
  }
}
