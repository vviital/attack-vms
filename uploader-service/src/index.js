"use strict";

const assert = require("assert");
const { MongoClient } = require("mongodb");
const config = require("./config");

assert(config.mongoUrl);
assert(config.virtualMachineRuleDbName);
assert(config.firewallRuleDbName);
assert(config.inputFileName);

const data = require(`../data/${config.inputFileName}`);

async function main() {
  const start = new Date();

  const connection = await MongoClient.connect(config.mongoUrl);
  const virtualMachineCollection = connection
    .db()
    .collection(config.virtualMachineRuleDbName);
  const firewallRuleCollection = connection
    .db()
    .collection(config.firewallRuleDbName);

  await virtualMachineCollection.deleteMany({});
  await firewallRuleCollection.deleteMany({});

  // Create indexes for the virtual machine collection
  await virtualMachineCollection.createIndex({ vm_id: 1 }, { unique: true });
  await virtualMachineCollection.createIndex({ tags: 1 });

  // Create indexes for the firewall rules collection
  await firewallRuleCollection.createIndex({ fw_id: 1 }, { unique: true });
  await firewallRuleCollection.createIndex({ source_tag: 1 });
  await firewallRuleCollection.createIndex({ dest_tag: 1 });

  for await (const vm of data.vms) {
    await virtualMachineCollection.insertOne(vm).catch(console.error);
  }

  for await (const fwRule of data.fw_rules) {
    await firewallRuleCollection.insertOne(fwRule).catch(console.error);
  }

  console.log(`All records uploaded in ${new Date() - start} ms`);
}

main();
