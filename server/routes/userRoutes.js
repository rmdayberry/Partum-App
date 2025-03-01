import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const router = express.Router();

// Helper function to generate tokens
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// 🛑 Prevent "Cast to ObjectId failed" error by ensuring login/register routes are FIRST
// 🔹 LOGIN (POST /users/login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push({ token: refreshToken });
    await user.save();


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

// 🔹 REGISTER (POST /users/register)
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

// 🔹 GET USER BY ID (GET /users/:id)
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  // Validate if the ID is a valid MongoDB ObjectId before querying
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 REFRESH TOKEN (POST /users/refresh-token)
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

    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
    user.refreshTokens.push({ token: newRefreshToken });
    await user.save();

    res.json({ authToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
});

// 🔹 LOGOUT (POST /users/logout)
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

    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 GET PREGNANCY PROGRESS (GET /users/:id/progress)
router.get("/:id/progress", async (req, res) => {
  const userId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }

  try {
    const user = await User.findById(userId);
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
  } catch (error) {
    console.error("Error fetching progress:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
