import { Router } from "express";

import { UserAdapter } from "../adapters/user.adapter";
import { UserApplication } from "../application/user.application";
import { UserPort } from "../ports/user.port";
import { UserController } from "./user.controller";

export class UserRoutes {
  readonly router = Router();

  constructor(private readonly controller: UserController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.post("/", this.controller.create.bind(this.controller));
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post(
      "/validate-access-token",
      this.controller.validateAccessToken.bind(this.controller)
    );
    this.router.get("/email", this.controller.getByEmail.bind(this.controller));
    this.router.get(
      "/refresh-token",
      this.controller.getByRefreshToken.bind(this.controller)
    );
  }
}
const port: UserPort = new UserAdapter();
const application = new UserApplication(port);
const controller = new UserController(application);
export const userRouter = new UserRoutes(controller).router;
