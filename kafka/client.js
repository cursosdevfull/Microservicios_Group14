const { Kafka, logLevel } = require("kafkajs");

const clientId = "CLIENT_01";
const brokers = ["localhost:9092"];

exports.kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.INFO,
});
