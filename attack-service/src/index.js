"use strict";

const mongoose = require("mongoose");
const kafka = require("./datasources/kafka");
const express = require("express");
const pino = require("express-pino-logger")();
const {
  trackResponseStatsMiddleware,
} = require("./middlewares/track-response-stats");
const config = require("./config");
const api = require("./v1");

const app = express();

app.use(pino);
app.use(trackResponseStatsMiddleware);
app.use("/api/v1", api);

app.use(function (err, req, res, next) {
  const code = err.__proto__?.status || 500;
  res
    .status(code)
    .json({ message: err.message || "Internal Service Error", code });
});

async function main() {
  await mongoose.connect(config.mongoUrl);
  await kafka.init();

  app.listen(config.port, () => {
    console.log("Service is listening on", config.port);
  });
}

main();
