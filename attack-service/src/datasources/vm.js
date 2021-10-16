"use strict";

const mongoose = require("mongoose");
const config = require("../config");

const VirtualMachineSchema = new mongoose.Schema({
  vm_id: String,
  name: String,
  tags: [String],
});

const VirtualMachine = mongoose.model(
  config.virtualMachineRuleDbName,
  VirtualMachineSchema
);

module.exports = {
  VirtualMachine,
};
