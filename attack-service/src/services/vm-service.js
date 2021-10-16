"use strict";

const _ = require("lodash");
const createError = require("http-errors");
const { VirtualMachine } = require("../datasources/vm");
const { FirewallRule } = require("../datasources/firewall-rule");

async function getAttackersVMIds(vmId) {
  const vm = await VirtualMachine.findOne({ vm_id: vmId });
  if (!vm) {
    throw new createError(404, "VM not found");
  }

  const vms = await FirewallRule.getAttackersVMsByTags(vm.tags);

  return _.map(vms, "vm_id");
}

async function getVMsCount() {
  return VirtualMachine.countDocuments().exec();
}

module.exports = {
  getAttackersVMIds,
  getVMsCount,
};
