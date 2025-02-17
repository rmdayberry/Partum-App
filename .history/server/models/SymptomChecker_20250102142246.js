const mongoose = require("mongoose");

const AdviceSchema = new mongoose.Schema({
  general: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  emergency: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
});

const SectionSchema = new mongoose.Schema({
  sectionTitle: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  content: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
});

const CategorySchema = new mongoose.Schema({
  categoryTitle: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  sections: [SectionSchema],
});

const SymptomCheckerSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  overview: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  categories: [CategorySchema],
  advice: AdviceSchema,
});

module.exports = mongoose.model(
  "SymptomChecker",
  SymptomCheckerSchema,
  "symptomChecker"
);
