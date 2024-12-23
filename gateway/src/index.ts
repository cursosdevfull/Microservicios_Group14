import './config/environment-vars';
import 'reflect-metadata';

import app from './app';
import { ReturnType } from './bootstrap/bootstrap.type';
import { ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    const instances: ReturnType[] = [serverBootstrap.initialize()];
    await Promise.all(instances);
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
    serverBootstrap.close();
  }
})();
