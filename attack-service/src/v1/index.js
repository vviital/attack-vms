"use strict";

const { Router } = require("express");

const router = Router();

router.get("/attack", (req, res) => {
  const vmId = req.query.vm_id;
  if (!vmId) {
    return res
      .status(400)
      .json({ code: 400, message: "VM identifier is missing" });
  }

  res.json(["vm-c7bac01a07"]);
});

router.get("/stats", (req, res) => {
  res.send({
    vm_count: 2,
    request_count: 1120232,
    average_request_time: 0.003032268166772597,
  });
});

module.exports = router;
