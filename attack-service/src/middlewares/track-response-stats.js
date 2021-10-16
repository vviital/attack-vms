"use strict";

const logger = require("pino")();
const config = require("../config");
const { sendStatsMessage } = require("../datasources/kafka");

function trackResponseStatsMiddleware(req, res, next) {
  const start = process.hrtime();

  res.on("finish", () => {
    const elapsed = process.hrtime(start);
    const elapsedTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1e6;

    sendStatsMessage({
      serviceName: config.serviceName,
      url: req.path,
      elapsed: elapsedTimeInMs,
    }).catch((error) => {
      logger.error("Cannot send stats message", { error });
    });
  });

  next();
}

module.exports = { trackResponseStatsMiddleware };
