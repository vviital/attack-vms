"use strict";

const { Router } = require("express");
const createError = require("http-errors");
const { getAttackersVMIds } = require("../services/vm-service");

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

router.get("/stats", async (req, res) => {
  res.send({
    vm_count: 2,
    request_count: 1120232,
    average_request_time: 0.003032268166772597,
  });
});

module.exports = router;
