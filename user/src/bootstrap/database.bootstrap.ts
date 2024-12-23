import { DataSource } from 'typeorm';

import envs from '../config/environment-vars';
import { UserEntity } from '../modules/user/adapters/entities/user.entity';
import { ReturnType, TBootstrap } from './bootstrap.type';

export class DatabaseBootstrap implements TBootstrap {
  private static appDataSource: DataSource;

  initialize(): ReturnType {
    const dbConfig = {
      host: envs.mysqlHost,
      port: envs.mysqlPort,
      username: envs.mysqlUser,
      password: envs.mysqlPassword,
      database: envs.mysqlDatabase,
      entities: [UserEntity],
      synchronize: true,
      logging: false,
      poolSize: 100,
    };

    const AppDataSource = new DataSource({ type: "mysql", ...dbConfig });
    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }

  close() {
    return DatabaseBootstrap.appDataSource?.destroy();
  }
}
