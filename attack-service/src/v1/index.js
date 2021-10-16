"use strict";

const { Router } = require("express");
const createError = require("http-errors");
const { getAttackersVMIds } = require("../services/vm-service");
const { getFullStats } = require("../services/stats-service");

const router = Router();

router.get("/attack", async (req, res, next) => {
  try {
    const vmId = req.query.vm_id;
    if (!vmId) {
      throw new createError(404, "VM identifier is missing");
    }

    const ids = await getAttackersVMIds(vmId);

    res.json(ids);
  } catch (e) {
    next(e);
  }
});

router.get("/stats", async (req, res, next) => {
  try {
    const fullStats = await getFullStats();

    res.send({
      vm_count: fullStats.vmsCount,
      request_count: fullStats.requestCount,
      average_request_time: fullStats.averageRequestTime,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
