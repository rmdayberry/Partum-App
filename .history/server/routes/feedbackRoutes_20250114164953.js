const express = require("express");
const Feedback = require("../models/feedbackModel");

const router = express.Router();
const User = require("../models/User");

// POST: Submit Feedback
router.post("/", async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create and save feedback
    const feedback = new Feedback({ userId, message });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully." });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// GET: Fetch Feedback with User Details
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "name email");
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
