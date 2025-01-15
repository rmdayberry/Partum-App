const express = require("express");
const Feedback = require("../models/feedbackModel");

const router = express.Router();

// POST: Submit feedback
router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res
      .status(400)
      .json({ message: "User ID and message are required" });
  }

  try {
    const feedback = new Feedback({ userId, message });
    await feedback.save(); // MongoDB will create the collection if it doesn't exist
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res
      .status(500)
      .json({ message: "Server error. Unable to submit feedback." });
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
