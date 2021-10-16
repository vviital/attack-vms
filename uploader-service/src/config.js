"use strict";

module.exports = {
  mongoUrl: process.env.MONGO_DB_URL,
  firewallRuleDbName: process.env.FIREWALL_RULE_DB_NAME || "firewall-rules",
  virtualMachineRuleDbName:
    process.env.VIRTUAL_MACHINE_RULE_DB_NAME || "virtual-machines",
  inputFileName: process.env.INPUT_FILE_NAME,
};
