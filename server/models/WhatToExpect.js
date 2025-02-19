import mongoose from "mongoose";

const whatToExpectWeeklySchema = new mongoose.Schema({
  week: { type: Number, required: true, unique: true },
  tip: { type: String, required: true },
  tipEs: { type: String, required: true },
});

const WhatToExpect = mongoose.model(
  "WhatToExpectWeekly",
  whatToExpectWeeklySchema,
  "whatToExpectWeekly"
);

export default WhatToExpect;
