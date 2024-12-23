import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config({ path: ["env.txt"] });

export type ReturnEnvironmentVars = {
  port: number;
  userServiceUrl: string;
  authServiceUrl: string;
  appointmentServiceUrl: string;
};

export type EnvironmentVars = {
  PORT: number;
  USER_SERVICE_URL: string;
  AUTH_SERVICE_URL: string;
  APPOINTMENT_SERVICE_URL: string;
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
      USER_SERVICE_URL: joi.string().required(),
      AUTH_SERVICE_URL: joi.string().required(),
      APPOINTMENT_SERVICE_URL: joi.string().required(),
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
    userServiceUrl: value.USER_SERVICE_URL,
    authServiceUrl: value.AUTH_SERVICE_URL,
    appointmentServiceUrl: value.APPOINTMENT_SERVICE_URL,
  };
}

const envs = loadEnvironmentVars();

export default envs;
