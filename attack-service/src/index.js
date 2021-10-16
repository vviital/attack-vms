"use strict";

const express = require("express");
const config = require("./config");
const api = require("./v1");

const app = express();

app.use("/api/v1", api);

app.listen(config.port, () => {
  console.log("Service is listening on", config.port);
});
