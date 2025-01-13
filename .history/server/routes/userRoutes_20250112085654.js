const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshTokenModel"); // Model for refresh tokens
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

// Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password, dueDate, languagePreference } = req.body;

  if (!name || !email || !password || !dueDate || !languagePreference) {
    return res
      .status(400)
      .json({ message: "All fields are required for registration." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = new User({
      name,
      email,
      password,
      dueDate,
      languagePreference,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
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

    // Save refresh token in the database
    await RefreshToken.create({ token: refreshToken, userId: user._id });

    res.json({
      message: "Login successful",
      authToken: accessToken,
      refreshToken,
      userId: user._id,
      languagePreference: user.languagePreference,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Refresh token endpoint
router.post("/refresh-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Refresh token required." });
  }

  try {
    const existingToken = await RefreshToken.findOne({ token });
    if (!existingToken) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded.id);

    res.json({ authToken: accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

// Logout endpoint
router.post("/logout", async (req, res) => {
  const { token } = req.body;

  try {
    await RefreshToken.findOneAndDelete({ token });
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
