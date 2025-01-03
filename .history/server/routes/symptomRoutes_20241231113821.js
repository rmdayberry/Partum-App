const express = require("express");
const router = express.Router();
const SymptomChecker = require("../models/SymptomChecker");

// GET all symptoms
router.get("/symptoms", async (req, res) => {
  try {
    const symptoms = await SymptomChecker.find({});
    res.json(symptoms);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET details for a specific symptom by ID
router.get("/symptoms/:id", async (req, res) => {
  try {
    const symptom = await SymptomChecker.findById(req.params.id);
    if (!symptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }
    res.json(symptom);
  } catch (error) {
    console.error("Error fetching symptom:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
