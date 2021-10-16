"use strict";

const mongoose = require("mongoose");
const config = require("../config");
const _ = require("lodash");

const FirewallRuleSchema = new mongoose.Schema({
  fw_id: String,
  source_tag: String,
  dest_tag: String,
});

const FirewallRule = mongoose.model(
  config.firewallRuleDbName,
  FirewallRuleSchema
);

FirewallRule.getAttackersVMsByTags = async function (tags) {
  if (_.isEmpty(tags)) {
    return [];
  }

  const result = await FirewallRule.aggregate([
    { $match: { dest_tag: { $in: tags } } },
    { $group: { _id: "$source_tag" } },
    { $group: { _id: null, tags: { $push: "$_id" } } },
    {
      $lookup: {
        from: config.virtualMachineRuleDbName,
        localField: "tags",
        foreignField: "tags",
        as: "vms",
      },
    },
  ]).exec();

  return result[0]?.vms || [];
};

module.exports = {
  FirewallRule,
};
