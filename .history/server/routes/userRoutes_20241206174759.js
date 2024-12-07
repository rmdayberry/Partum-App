const express = require("express");
const User = require("../models/userModel");
const router = express.Router();

// Fetch user data
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Calculate pregnancy progress
router.get("/:id/progress", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.dueDate) {
      return res
        .status(400)
        .json({ message: "Due date not set for this user" });
    }

    const dueDate = new Date(user.dueDate);
    const currentDate = new Date();
    const totalPregnancyDays = 280; // Approx. 40 weeks

    const daysElapsed = Math.floor(
      (currentDate - (dueDate - totalPregnancyDays * 24 * 60 * 60 * 1000)) /
        (1000 * 60 * 60 * 24)
    );

    const progress = Math.max(
      0,
      Math.min(100, ((daysElapsed / totalPregnancyDays) * 100).toFixed(2))
    );

    res.json({ progress });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
