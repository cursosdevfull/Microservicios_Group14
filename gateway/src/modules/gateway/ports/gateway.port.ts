import { ValidateToken } from '../adapters/validate-token.type';
import { Appointment } from '../application/appointment';
import { Auth } from '../application/auth';
import { Tokens } from '../application/tokens.type';
import { User } from '../application/user';

export type GatewayPort = {
  login(auth: Auth): Promise<Tokens>;
  createUser(user: User): Promise<User>;
  bookAppointment(appointment: Appointment): Promise<void>;
  validateToken(token: string): Promise<ValidateToken>;
};
