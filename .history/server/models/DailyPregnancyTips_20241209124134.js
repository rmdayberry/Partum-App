const mongoose = require("mongoose");

const dailyTipSchema = new mongoose.Schema({
  day: { type: Number, required: true, unique: true },
  tip: { type: String, required: true },
  tipSpanish: { type: String, required: true },
});

const DailyTip = mongoose.model("DailyTip", dailyTipSchema, "dailyTips");

module.exports = DailyTip;
