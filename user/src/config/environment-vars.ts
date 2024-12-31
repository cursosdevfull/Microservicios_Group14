//import * as dotenv from 'dotenv';
import * as joi from "joi";

//dotenv.config({ path: ["env.txt"] });

export type ReturnEnvironmentVars = {
  port: number;
  mysqlHost: string;
  mysqlPort: number;
  mysqlUser: string;
  mysqlPassword: string;
  mysqlDatabase: string;
  jwtSecret: string;
  jwtExpiresIn: string;
};

export type EnvironmentVars = {
  PORT: number;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
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
      JWT_SECRET: joi.string().required(),
      JWT_EXPIRES_IN: joi.string().required(),
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
    jwtSecret: value.JWT_SECRET,
    jwtExpiresIn: value.JWT_EXPIRES_IN,
  };
}

const envs = loadEnvironmentVars();

export default envs;
