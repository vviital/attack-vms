const assert = require("assert");
const _ = require("lodash");

// TODO: Make scoped configs
const config = {
  port: +process.env.PORT || 3000,
  mongoUrl: process.env.MONGO_DB_URL || "mongodb://localhost/attack-service",
  firewallRuleDbName: process.env.FIREWALL_RULE_DB_NAME || "firewall-rules",
  virtualMachineRuleDbName:
    process.env.VIRTUAL_MACHINE_RULE_DB_NAME || "virtual-machines",
  kafkaClientId: process.env.KAFKA_CLIENT_ID || "attack-service",
  kafkaStatsTopic: process.env.KAFKA_STATS_TOPIC || "stats-topic",
  kafkaBrokers: process.env.KAFKA_BROKERS_LIST
    ? _.split(process.env.KAFKA_BROKERS_LIST, ",")
    : ["localhost:9092"],
  serviceName: process.env.SERVICE_NAME || "attack-service",
  clickHouseUrl: process.env.CLICK_HOUSE_URL || "http://localhost",
  clickHousePort: process.env.CLICK_HOUSE_PORT || 8123,
  clickHouseUsername: process.env.CLICK_HOUSE_USERNAME || "default",
  clickHousePassword: process.env.CLICK_HOUSE_PASSWORD || "",
};

assert(config.port);
assert(config.mongoUrl);
assert(config.firewallRuleDbName);
assert(config.virtualMachineRuleDbName);
assert(config.kafkaClientId);
assert(config.kafkaBrokers);
assert(config.serviceName);
assert(config.clickHouseUrl);
assert(config.clickHousePort);
assert(config.clickHouseUsername);

module.exports = config;
