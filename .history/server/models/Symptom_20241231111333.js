const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
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
    en: { type: String },
    es: { type: String },
  },
});

module.exports = mongoose.model("Symptom", SymptomSchema);
