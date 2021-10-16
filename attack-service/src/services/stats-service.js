"use strict";

const vmService = require("../services/vm-service");
const statsDatasource = require("../datasources/stats");

async function getFullStats() {
  const [vmsCount, stats] = await Promise.all([
    vmService.getVMsCount(),
    statsDatasource.getStats(),
  ]);

  return { vmsCount, ...stats };
}

module.exports = { getFullStats };
