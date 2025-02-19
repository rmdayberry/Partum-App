import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// Helper function to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24hr",
  });
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
      console.log("User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    console.log("User authenticated:", user._id);

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    console.log("Access Token Generated:", accessToken);
    console.log("Refresh Token Generated:", refreshToken);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    console.log("Updated User Refresh Tokens:", user.refreshTokens);

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
    const user = await User.findOne({ "refreshTokens.token": token });

    if (!user) {
      console.error("Refresh token not found in database.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("Token verified for user:", decoded.id);

    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
    user.refreshTokens.push({ token: newRefreshToken });
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
    const user = await User.findOne({ "refreshTokens.token": token });

    if (!user) {
      console.error("Refresh token not found during logout.");
      return res.status(404).json({ message: "Refresh token not found." });
    }

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
    await user.save();

    console.log("Refresh token deleted successfully for logout.");
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get pregnancy progress
router.get("/:id/progress", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dueDate = new Date(user.dueDate);
    const currentDate = new Date();
    const totalPregnancyDays = 280; // Approx. 40 weeks

    const daysElapsed = Math.floor(
      (currentDate - dueDate + totalPregnancyDays * 24 * 60 * 60 * 1000) /
        (1000 * 60 * 60 * 24)
    );
    const progress = Math.max(
      0,
      Math.min(100, ((daysElapsed / totalPregnancyDays) * 100).toFixed(2))
    );

    res.json({ progress });
  } catch (err) {
    console.error("Error fetching progress:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;

