import mongoose from "mongoose";

const dailyPregnancyTipSchema = new mongoose.Schema({
  day: { type: Number, required: true, unique: true },
  tip: { type: String, required: true },
  tipSpanish: { type: String, required: true },
});

const DailyTip = mongoose.model(
  "DailyPregnancyTip",
  dailyPregnancyTipSchema,
  "dailyPregnancyTips"
);

export default DailyTip;
