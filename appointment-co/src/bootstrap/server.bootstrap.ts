import express from "express";
import http from "http";

import envs from "../config/environment-vars";
import { ReturnType, TBootstrap } from "./bootstrap.type";

export class ServerBootstrap implements TBootstrap {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  initialize(): ReturnType {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const port = envs.port;
      server
        .listen(port)
        .on("listening", () => {
          console.log(`Server is running on port ${port}`);
          resolve(true);
        })
        .on("error", (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  close() {
    process.exit(1);
  }
}
