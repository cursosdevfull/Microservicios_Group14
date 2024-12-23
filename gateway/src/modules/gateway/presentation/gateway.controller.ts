import { Request, Response } from 'express';

import { Appointment } from '../application/appointment';
import { Auth } from '../application/auth';
import { GatewayApplication } from '../application/gateway.application';
import { User } from '../application/user';

export class GatewayController {
  constructor(private readonly application: GatewayApplication) {}

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const auth = new Auth();
      auth.email = email;
      auth.password = password;

      const tokens = await this.application.login(auth);
      response.status(200).json(tokens);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async createUser(request: Request, response: Response) {
    try {
      const { firstname, lastname, email, password } = request.body;
      const user = new User();
      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.password = password;

      const userCreated = await this.application.createUser(user);
      response.status(200).json(userCreated);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async bookAppointment(request: Request, response: Response) {
    try {
      const { countryIso, patientId, medicId, scheduleId, centerId } =
        request.body;
      const appointment = new Appointment();
      appointment.countryIso = countryIso;
      appointment.patientId = patientId;
      appointment.medicId = medicId;
      appointment.scheduleId = scheduleId;
      appointment.centerId = centerId;

      await this.application.bookAppointment(appointment);
      response.status(204).send();
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
}
