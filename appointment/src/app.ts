import express, { Request, Response } from "express";

import { routes } from "./modules/appointment/infrastructure/presentation/appointment.routes";

class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountHealthCheck();
  }

  private mountMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mountRoutes(): void {
    this.app.use("/appointment", routes);
  }

  private mountHealthCheck(): void {
    this.app.get("/healthcheck", (req: Request, res: Response) => {
      res.send("OK");
    });
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
