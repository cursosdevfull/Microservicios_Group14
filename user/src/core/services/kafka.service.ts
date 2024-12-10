import { Consumer, Partitioners, Producer } from "kafkajs";

import { KafkaBootstrap } from "../../bootstrap/kafka.bootstrap";
import envs from "../../config/environment-vars";

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topicList: string[]) => {
  const topics = topicList.map((topic) => ({
    topic,
    numPartitions: 2,
    replicationFactor: 1,
  }));

  const admin = KafkaBootstrap.getInstanceKafka().admin();
  await admin.connect();
  const topicExists = await admin.listTopics();

  for (const t of topics) {
    if (!topicExists.includes(t.topic)) {
      await admin.createTopics({
        topics: [t],
      });
    }
  }

  await admin.disconnect();
};

const connectProducer = async () => {
  await createTopic([
    envs.kafkaTopicPE,
    envs.kafkaTopicCO,
    envs.kafkaTopicMX,
    envs.kafkaTopicComplete,
  ]);

  if (producer) {
    return producer;
  }

  producer = KafkaBootstrap.getInstanceKafka().producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();
  return producer;
};

const disconnectProducer = async () => {
  if (producer) {
    await producer.disconnect();
  }
};

const connectConsumer = async () => {
  if (consumer) {
    return consumer;
  }
  consumer = KafkaBootstrap.getInstanceKafka().consumer({
    groupId: envs.kafkaGroupId,
  });

  await consumer.connect();
  return consumer;
};

export const MessageBrokerKafka = {
  connectProducer,
  disconnectProducer,
  connectConsumer,
};
