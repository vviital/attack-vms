"use strict";

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
    }).catch(console.error); // TODO: Replace by pino
  });

  next();
}

module.exports = { trackResponseStatsMiddleware };
