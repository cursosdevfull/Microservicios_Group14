import envs from '../../../config/environment-vars';
import { Auth } from '../application/auth';
import { Tokens } from '../application/tokens.type';
import { ValidateToken } from '../application/validate-token.type';
import { AuthPort } from '../ports/auth.port';

export class AuthAdapter implements AuthPort {
  async login(auth: Auth): Promise<Tokens> {
    return fetch(`${envs.userServiceUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(auth),
    }).then((res) => res.json());
  }

  async validateToken(token: string): Promise<ValidateToken> {
    return fetch(`${envs.userServiceUrl}/user/validate-access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ accessToken: token }),
    }).then((res) => res.json());
  }
}
