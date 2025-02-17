const mongoose = require("mongoose");

const SymptomCheckerSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  overview: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
  sections: [
    {
      title: {
        en: { type: String, required: true },
        es: { type: String, required: true },
      },
      content: {
        en: { type: String, required: true },
        es: { type: String, required: true },
      },
    },
  ],
  advice: {
    en: { type: String, required: true },
    es: { type: String, required: true },
  },
});

module.exports = mongoose.model("SymptomChecker", SymptomCheckerSchema);
