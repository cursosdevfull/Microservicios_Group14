import express, { Request, Response } from "express";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.mountRoutes();
    this.mountHealthCheck();
  }

  private mountRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
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
