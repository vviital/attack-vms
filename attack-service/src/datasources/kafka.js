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
  const msg = JSON.stringify({
    ...message,
    loggedAt: new Date().toISOString(),
  });

  // Might be replaced by StatsD
  await producer.send({
    topic: config.kafkaStatsTopic,
    messages: [
      {
        value: msg,
      },
    ],
  });
}

module.exports = { init, sendStatsMessage };
