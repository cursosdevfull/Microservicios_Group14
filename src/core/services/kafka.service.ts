import { Consumer, Kafka, Partitioners, Producer } from "kafkajs";

const kafka = new Kafka({
  clientId: "client01",
  brokers: ["localhost:9092"],
});

let producer: Producer;
let consumer: Consumer;

const createTopic = async (topicList: string[]) => {
  const topics = topicList.map((topic) => ({
    topic,
    numPartitions: 2,
    replicationFactor: 1,
  }));

  const admin = kafka.admin();
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
  await createTopic(["test-topic"]);

  if (producer) {
    return producer;
  }

  producer = kafka.producer({
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
