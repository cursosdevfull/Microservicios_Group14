import { Router } from 'express';

import { GatewayAdapter } from '../adapters/gateway.adapter';
import { GatewayApplication } from '../application/gateway.application';
import { GatewayPort } from '../ports/gateway.port';
import { GatewayController } from './gateway.controller';
import { AuthenticationGuard } from './guards/authentication.guard';

export class GatewayRoutes {
  readonly router = Router();

  constructor(private readonly controller: GatewayController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post(
      "/user/create",
      //AuthenticationGuard.execute,
      this.controller.createUser.bind(this.controller)
    );
    this.router.post(
      "/appointment/book",
      AuthenticationGuard.execute,
      this.controller.bookAppointment.bind(this.controller)
    );
  }
}
const port: GatewayPort = new GatewayAdapter();
const application = new GatewayApplication(port);
const controller = new GatewayController(application);
export const gatewayRouter = new GatewayRoutes(controller).router;
