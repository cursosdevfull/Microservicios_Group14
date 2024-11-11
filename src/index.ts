import "./config/environment-vars";
import "reflect-metadata";

import app from "./app";
import { ReturnType } from "./bootstrap/bootstrap.type";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

const serverBootstrap = new ServerBootstrap(app);
const databaseBootstrap = new DatabaseBootstrap();

(async () => {
  try {
    const instances: ReturnType[] = [
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
    ];
    await Promise.all(instances);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
    databaseBootstrap.close();
    serverBootstrap.close();
  }
})();
