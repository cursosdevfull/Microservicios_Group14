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
  rabbitmqHost: string;
  kafkaBroker: string;
  kafkaTopicPE: string;
  kafkaTopicMX: string;
  kafkaTopicCO: string;
  kafkaTopicComplete: string;
  kafkaGroupId: string;
  clientId: string;
};

export type EnvironmentVars = {
  PORT: number;
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_DATABASE: string;
  RABBITMQ_HOST: string;
  KAFKA_BROKER: string;
  KAFKA_TOPIC_PE: string;
  KAFKA_TOPIC_CO: string;
  KAFKA_TOPIC_MX: string;
  KAFKA_TOPIC_COMPLETE: string;
  KAFKA_GROUP_ID: string;
  CLIENT_ID: string;
};

type ValidationEnvironmentVars = {
  error: joi.ValidationError | undefined;
  value: EnvironmentVars;
};

function validateEnvironmentVars(
  vars: NodeJS.ProcessEnv
): ValidationEnvironmentVars {
  console.log("vars", vars);
  const envsSchema = joi
    .object({
      PORT: joi.number().required(),
      MYSQL_HOST: joi.string().required(),
      MYSQL_PORT: joi.number().required(),
      MYSQL_USER: joi.string().required(),
      MYSQL_PASSWORD: joi.string().required(),
      MYSQL_DATABASE: joi.string().required(),
      RABBITMQ_HOST: joi.string().required(),
      KAFKA_BROKER: joi.string().required(),
      KAFKA_TOPIC_PE: joi.string().required(),
      KAFKA_TOPIC_CO: joi.string().required(),
      KAFKA_TOPIC_MX: joi.string().required(),
      KAFKA_TOPIC_COMPLETE: joi.string().required(),
      KAFKA_GROUP_ID: joi.string().required(),
      CLIENT_ID: joi.string().required(),
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
    kafkaBroker: value.KAFKA_BROKER,
    kafkaTopicPE: value.KAFKA_TOPIC_PE,
    kafkaTopicCO: value.KAFKA_TOPIC_CO,
    kafkaTopicMX: value.KAFKA_TOPIC_MX,
    kafkaTopicComplete: value.KAFKA_TOPIC_COMPLETE,
    kafkaGroupId: value.KAFKA_GROUP_ID,
    clientId: value.CLIENT_ID,
  };
}

const envs = loadEnvironmentVars();

export default envs;
