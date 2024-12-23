import envs from '../../../config/environment-vars';
import { Appointment } from '../application/appointment';
import { Auth } from '../application/auth';
import { Tokens } from '../application/tokens.type';
import { User } from '../application/user';
import { GatewayPort } from '../ports/gateway.port';
import { ValidateToken } from './validate-token.type';

export class GatewayAdapter implements GatewayPort {
  async login(auth: Auth): Promise<Tokens> {
    return fetch(`${envs.authServiceUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(auth),
    }).then((res) => res.json());
  }

  async createUser(user: User): Promise<User> {
    return fetch(`${envs.userServiceUrl}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  }

  async bookAppointment(appointment: Appointment): Promise<any> {
    return fetch(`${envs.appointmentServiceUrl}/appointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });
  }

  async validateToken(token: string): Promise<ValidateToken> {
    return fetch(`${envs.authServiceUrl}/auth/validate-token?token=${token}`, {
      method: "get",
    }).then((res) => res.json());
  }
}
