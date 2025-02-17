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

  console.log("Login attempt received"); //  Step 1: Confirm request reached the backend
  console.log("Request Body:", req.body); // Step 2: See what data is being sent

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("User not found for email:", email); // Step 3: Debug if user not found
      return res.status(401).json({ message: "Invalid credentials." });
    }
    console.log("User authenticated:", user._id); // Step 5: User authentication successful

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Check if a refresh token already exists for this user
    await RefreshToken.findOneAndUpdate(
      { userId: user._id },
      { token: refreshToken },
      { upsert: true, new: true }
    );

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
    // Find the refresh token in the database
    const storedToken = await RefreshToken.findOne({ token });
    if (!storedToken) {
      console.error("Refresh token not found in database.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("Token verified for user:", decoded.id);

    // Generate new tokens
    const newAccessToken = generateAccessToken(decoded.id);
    const newRefreshToken = generateRefreshToken(decoded.id);

    // Update the refresh token in the database
    storedToken.token = newRefreshToken;
    await storedToken.save();

    console.log("Refresh token updated successfully.");

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
    const deletedToken = await RefreshToken.findOneAndDelete({ token });
    if (!deletedToken) {
      console.error("Refresh token not found during logout.");
      return res.status(404).json({ message: "Refresh token not found." });
    }

    console.log("Refresh token deleted successfully for logout.");
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id/progress", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dueDate = new Date(user.dueDate);
    const currentDate = new Date();
    const totalPregnancyDays = 280; // Approx. 40 weeks

    // Calculate progress
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

module.exports = router;
