const { kafka } = require("./client");
const readline = require("readline");
const { Partitioners } = require("kafkajs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stout,
});

(async () => {
  const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner,
  });

  await producer.connect();

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async (line) => {
    const [message, partition] = line.split(" ");
    const options = {
      topic: "update-client",
      messages: [
        {
          partition,
          //key: "client web",
          value: JSON.stringify({ message }),
        },
      ],
    };
    console.log(options);
    await producer.send(options);
  }).on("close", async () => await producer.disconnect());
})();
