const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
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

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, dueDate, languagePreference } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // You should hash this before saving
      dueDate,
      languagePreference,
    });

    // Save the user instance to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
