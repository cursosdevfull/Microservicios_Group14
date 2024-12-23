import { Auth } from '../application/auth';
import { Tokens } from '../application/tokens.type';
import { ValidateToken } from '../application/validate-token.type';

export type AuthPort = {
  login(auth: Auth): Promise<Tokens>;
  validateToken(token: string): Promise<ValidateToken>;
};
