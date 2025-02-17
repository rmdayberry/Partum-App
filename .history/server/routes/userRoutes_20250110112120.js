const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Helper function to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// In-memory storage for refresh tokens (for simplicity, replace with a DB in production)
let refreshTokens = [];

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
  const { name, email, password, dueDate, languagePreference } = req.body;

  if (!name || !email || !password || !dueDate || !languagePreference) {
    return res
      .status(400)
      .json({ message: "All fields are required for registration." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // Hashing is handled by the pre-save middleware
      dueDate,
      languagePreference,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store the refresh token
    refreshTokens.push(refreshToken);

    res.json({
      message: "Login successful",
      authToken: accessToken,
      refreshToken: refreshToken,
      userId: user._id,
      languagePreference: user.languagePreference,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Refresh token endpoint
router.post("/refresh-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required." });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded.id);
    res.json({ authToken: accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  const { token } = req.body;

  // Remove the refresh token
  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message: "Logged out successfully." });
});

module.exports = router;
