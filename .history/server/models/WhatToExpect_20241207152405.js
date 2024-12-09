const mongoose = require("mongoose");

const whatToExpectWeeklySchema = new mongoose.Schmema({
  week: { type: Number, required: true, unique: true },
  tip: { type: String, required: true },
});

const WhatToExpect = mongoose.model(
  "WhatToExpectWeekly",
  whatToExpectSchema,
  "whatToExpectWeekly"
);

module.exports = WhatToExpect;
