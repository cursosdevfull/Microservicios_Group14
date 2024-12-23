import { AuthPort } from '../ports/auth.port';
import { Auth } from './auth';
import { Tokens } from './tokens.type';
import { ValidateToken } from './validate-token.type';

export class AuthApplication {
  constructor(private readonly authPort: AuthPort) {}

  async login(auth: Auth): Promise<Tokens | null> {
    return this.authPort.login(auth);
  }

  async validateToken(token: string): Promise<ValidateToken> {
    return this.authPort.validateToken(token);
  }
}
