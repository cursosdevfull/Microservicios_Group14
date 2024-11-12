import "dotenv/config";

import * as joi from "joi";

export type ReturnEnvironmentVars = {
  port: number;
  mysqlHost: string;
  mysqlPort: number;
  mysqlUser: string;
  mysqlPassword: string;
  mysqlDatabase: string;
  rabbitmqHost: string;
};

export type EnvironmentVars = {
  PORT: number;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  RABBITMQ_HOST: string;
};

type ValidationEnvironmentVars = {
  error: joi.ValidationError | undefined;
  value: EnvironmentVars;
};

function validateEnvironmentVars(
  vars: NodeJS.ProcessEnv
): ValidationEnvironmentVars {
  const envsSchema = joi
    .object({
      PORT: joi.number().required(),
      MYSQL_HOST: joi.string().required(),
      MYSQL_PORT: joi.number().required(),
      MYSQL_USER: joi.string().required(),
      MYSQL_PASSWORD: joi.string().required(),
      MYSQL_DATABASE: joi.string().required(),
      RABBITMQ_HOST: joi.string().required(),
    })
    .unknown(true);

  const { error, value } = envsSchema.validate(vars);
  return { error, value };
}

function loadEnvironmentVars(): ReturnEnvironmentVars {
  const result = validateEnvironmentVars(process.env);

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  const value = result.value;

  return {
    port: value.PORT,
    mysqlHost: value.MYSQL_HOST,
    mysqlPort: value.MYSQL_PORT,
    mysqlUser: value.MYSQL_USER,
    mysqlPassword: value.MYSQL_PASSWORD,
    mysqlDatabase: value.MYSQL_DATABASE,
    rabbitmqHost: value.RABBITMQ_HOST,
  };
}

const envs = loadEnvironmentVars();

export default envs;
