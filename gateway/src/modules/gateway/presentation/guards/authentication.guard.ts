import { NextFunction, Request, Response } from 'express';

import { GatewayAdapter } from '../../adapters/gateway.adapter';
import { GatewayApplication } from '../../application/gateway.application';
import { GatewayPort } from '../../ports/gateway.port';

export class AuthenticationGuard {
  static async execute(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (
      request.headers &&
      request.headers["authorization"] &&
      request.headers["authorization"].startsWith("Bearer")
    ) {
      const token = request.headers["authorization"].split(" ")[1];
      if (token) {
        const port: GatewayPort = new GatewayAdapter();
        const application = new GatewayApplication(port);
        const validate = await application.validateToken(token);

        if ("isValid" in validate) {
          next();
        } else {
          response.status(401).send("Unauthorized");
        }
      } else {
        response.status(401).send("Unauthorized");
      }
    } else {
      response.status(401).send("Unauthorized");
    }
  }
}
