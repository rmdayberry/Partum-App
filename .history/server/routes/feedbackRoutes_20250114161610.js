const express = require("express");
const Feedback = require("../models/feedbackModel");

const router = express.Router();

// POST: Submit feedback
router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const newFeedback = new Feedback({ userId, message });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (err) {
    console.error("Error saving feedback:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// GET: Fetch all feedback (Admin use case)
router.get("/", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json(feedbackList);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
