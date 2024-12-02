import { Router } from "express";

import { AppointmentApplication } from "../../application/appointment.application";
import { AppointmentRepository } from "../../domain/repositories/appointment.repository";
import { AppointmentInfrastructure } from "../appointment.infrastructure";
import { AppointmentController } from "./appointment.controller";

class AppointmentRoutes {
  private readonly router = Router();

  constructor(private readonly controller: AppointmentController) {
    this.addRoutes();
  }

  private addRoutes() {
    this.router.post("/", this.controller.create.bind(this.controller));
  }

  getRouter() {
    return this.router;
  }
}

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application = new AppointmentApplication(repository);
const controller = new AppointmentController(application);
export const routes = new AppointmentRoutes(controller).getRouter();
