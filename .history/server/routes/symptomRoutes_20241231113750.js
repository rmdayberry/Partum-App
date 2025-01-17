const express = require("express");
const router = express.Router();
const Symptom = require("../models/SymptomChecker");

// GET all symptoms
router.get("/symptoms", async (req, res) => {
  try {
    const symptoms = await Symptom.find({});
    res.json(symptoms);
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET details for a specific symptom
router.get("/symptoms/:id", async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);
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
