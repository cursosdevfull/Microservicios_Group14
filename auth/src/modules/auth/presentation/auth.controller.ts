import { Request, Response } from 'express';

import { Auth } from '../application/auth';
import { AuthApplication } from '../application/auth.application';

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  async login(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const auth: Auth = { email, password };
      const tokens = await this.application.login(auth);
      response.status(201).json(tokens);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }

  async validateToken(request: Request, response: Response) {
    try {
      const { token } = request.query;
      const validateToken = await this.application.validateToken(
        token as string
      );
      response.status(200).json(validateToken);
    } catch (error: any) {
      response.status(400).json({ error: error.message });
    }
  }
}
