"use strict";

module.exports = {
  mongoUrl: process.env.MONGO_DB_URL,
  firewallRuleDbName: process.env.FIREWALL_RULE_DB_NAME || "firewallRules",
  virtualMachineRuleDbName:
    process.env.VIRTUAL_MACHINE_RULE_DB_NAME || "virtualMachines",
  inputFileName: process.env.INPUT_FILE_NAME,
};
