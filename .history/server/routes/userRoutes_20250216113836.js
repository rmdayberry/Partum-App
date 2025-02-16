const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Helper function to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "24h" });
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
    console.error("Error fetching user data:", err.message);
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
      refreshTokens: [], // Initialize refreshTokens array
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt received");
  console.log("Request Body:", req.body);

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("User not found or invalid password:", email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("User authenticated:", user._id);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    console.log("Access Token Generated:", accessToken);
    console.log("Refresh Token Generated:", refreshToken);

    // 🔹 **Save refresh token inside user’s refreshTokens array**
    user.refreshTokens.push(refreshToken);
    await user.save();

    console.log("Updated Refresh Tokens:", user.refreshTokens);

    res.json({
      message: "Login successful",
      authToken: accessToken,
      refreshToken,
      userId: user._id,
      languagePreference: user.languagePreference,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Refresh token endpoint
router.post("/refresh-token", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.error("No refresh token provided.");
    return res.status(401).json({ message: "Refresh token required." });
  }

  try {
    // 🔹 **Find the user who has this refresh token**
    const user = await User.findOne({ refreshTokens: token });

    if (!user) {
      console.error("Refresh token not found in database.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // 🔹 **Verify the token**
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("Token verified for user:", decoded.id);

    // 🔹 **Generate new tokens**
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    // 🔹 **Replace old refresh token with the new one**
    user.refreshTokens = user.refreshTokens.filter(t => t !== token); // Remove old token
    user.refreshTokens.push(newRefreshToken); // Add new token
    await user.save();

    console.log("Updated Refresh Tokens:", user.refreshTokens);

    res.json({ authToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

// Logout endpoint
router.post("/logout", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.error("No token provided for logout.");
    return res.status(400).json({ message: "Token required for logout." });
  }

  try {
    // 🔹 **Find the user and remove the refresh token**
    const user = await User.findOneAndUpdate(
      { refreshTokens: token },
      { $pull: { refreshTokens: token } }, // Remove token from array
      { new: true }
    );

    if (!user) {
      console.error("Refresh token not found during logout.");
      return res.status(404).json({ message: "Refresh token not found." });
    }

    console.log("Refresh token deleted successfully for logout.");
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ mes

