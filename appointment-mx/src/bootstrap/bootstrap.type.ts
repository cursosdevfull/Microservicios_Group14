import { DataSource } from "typeorm";

export type ReturnType = Promise<boolean | DataSource>;

export type TBootstrap = {
  initialize(): ReturnType;
};
