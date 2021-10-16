const assert = require("assert");

const config = {
  port: +process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_DB_URL || "mongodb://localhost/attack-service",
  firewallRuleDbName: process.env.FIREWALL_RULE_DB_NAME || "firewall-rules",
  virtualMachineRuleDbName:
    process.env.VIRTUAL_MACHINE_RULE_DB_NAME || "virtual-machines",
};

assert(config.port);
assert(config.mongoUrl);
assert(config.firewallRuleDbName);
assert(config.virtualMachineRuleDbName);

module.exports = config;
