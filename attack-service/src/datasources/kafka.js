"use strict";

const { Kafka } = require("kafkajs");
const config = require("../config");

const kafka = new Kafka({
  clientId: config.kafkaClientId,
  brokers: config.kafkaBrokers,
});
const producer = kafka.producer();

async function init() {
  await producer.connect();
}

async function sendStatsMessage(message = {}) {
  // Might be replaced by StatsD
  await producer.send({
    topic: config.kafkaStatsTopic,
    messages: [
      {
        value: JSON.stringify({
          ...message,
          loggedAt: new Date(),
        }),
      },
    ],
  });
}

module.exports = { init, sendStatsMessage };
