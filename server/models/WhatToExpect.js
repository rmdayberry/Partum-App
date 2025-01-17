const mongoose = require("mongoose");

const whatToExpectWeeklySchema = new mongoose.Schema({
  week: { type: Number, required: true, unique: true },
  tip: { type: String, required: true },
});

const WhatToExpect = mongoose.model(
  "WhatToExpectWeekly",
  whatToExpectWeeklySchema,
  "whatToExpectWeekly"
);

module.exports = WhatToExpect;
