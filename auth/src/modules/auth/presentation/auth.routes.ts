import { Router } from 'express';

import { AuthAdapter } from '../adapters/auth.adapter';
import { AuthApplication } from '../application/auth.application';
import { AuthPort } from '../ports/auth.port';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  readonly router = Router();

  constructor(private readonly controller: AuthController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.get(
      "/validate-token",
      this.controller.validateToken.bind(this.controller)
    );
  }
}
const port: AuthPort = new AuthAdapter();
const application = new AuthApplication(port);
const controller = new AuthController(application);
export const authRouter = new AuthRoutes(controller).router;
