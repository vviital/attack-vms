"use strict";

const _ = require("lodash");
const { ClickHouse } = require("clickhouse");
const config = require("../config");

const clickhouse = new ClickHouse({
  url: config.clickHouseUrl,
  port: config.clickHousePort,
  debug: false,
  basicAuth: {
    username: "default",
    password: "",
  },
  isUseGzip: false,
  format: "json",
  raw: false,
});

async function getStats() {
  const stats = await clickhouse
    .query(
      "SELECT COUNT(*) as requestCount, AVG(elapsed) as averageRequestTime FROM stats"
    )
    .toPromise();

  return {
    requestCount: stats[0].requestCount,
    averageRequestTime: _.round(stats[0].averageRequestTime / 1000, 6),
  };
}

module.exports = { getStats };
