import { ValidateToken } from '../adapters/validate-token.type';
import { GatewayPort } from '../ports/gateway.port';
import { Appointment } from './appointment';
import { Auth } from './auth';
import { Tokens } from './tokens.type';
import { User } from './user';

export class GatewayApplication {
  constructor(private readonly gatewayPort: GatewayPort) {}

  async login(auth: Auth): Promise<Tokens> {
    return this.gatewayPort.login(auth);
  }

  async createUser(user: User): Promise<User> {
    return this.gatewayPort.createUser(user);
  }

  async bookAppointment(appointment: Appointment): Promise<any> {
    return this.gatewayPort.bookAppointment(appointment);
  }

  async validateToken(token: string): Promise<ValidateToken> {
    return this.gatewayPort.validateToken(token);
  }
}
