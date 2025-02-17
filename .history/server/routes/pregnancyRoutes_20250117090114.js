const express = require("express");
const User = require("../models/userModel");
const WhatToExpectWeekly = require("../models/WhatToExpect");
const DailyPregnancyTip = require("../models/DailyPregnancyTips");
const router = express.Router();

// Pregnancy progress endpoint
router.get("/pregnancy-progress/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const stripTime = (date) => new Date(date.toISOString().split("T")[0]);

    const dueDate = stripTime(new Date(user.dueDate));
    const currentDate = stripTime(new Date());
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
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Endpoint to set due date
router.put("/set-due-date/:userId", async (req, res) => {
  try {
    const { dueDate } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { dueDate },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Due date updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Endpoint to fetch weekly tips by userId
router.get("/whatToExpectWeekly/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { languagePreference = "English" } = user; // Default to English

    const dueDate = new Date(user.dueDate); // User's due date
    const startDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000); // 280 days before due date
    const currentDate = new Date();

    const daysElapsed = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    ); // Days since start of pregnancy
    const currentWeek = Math.min(40, Math.max(1, Math.ceil(daysElapsed / 7))); // Ensure week stays between 1 and 40

    const weeklyTip = await WhatToExpectWeekly.findOne({ week: currentWeek });

    if (!weeklyTip) {
      return res.status(404).json({ message: "Tip for this week not found" });
    }

    // Determine the tip based on language preference
    const tip =
      languagePreference === "Español" ? weeklyTip.tipSpanish : weeklyTip.tip;

    res.json({ week: currentWeek, tip });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Endpoint to fetch weekly tips by week with optional language preference
router.get("/whatToExpectWeekly/week/:week", async (req, res) => {
  try {
    const week = parseInt(req.params.week, 10); // Convert week to integer
    const { language = "English" } = req.query; // Get language from query params, default to English

    const weeklyTip = await WhatToExpectWeekly.findOne({ week });

    if (!weeklyTip) {
      return res.status(404).json({ message: "Tip for this week not found" });
    }

    // Determine the tip based on the language parameter
    const tip = language === "Español" ? weeklyTip.tipSpanish : weeklyTip.tip;

    res.json({ week, tip });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch daily pregnancy tip with language preference
router.get("/daily-tip/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { languagePreference = "English" } = user; // Default to English

    const dueDate = new Date(user.dueDate); // User's due date
    const startDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000); // 280 days before due date
    const currentDate = new Date();

    const daysElapsed = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (daysElapsed < 1 || daysElapsed > 280) {
      return res
        .status(400)
        .json({ message: "Day of pregnancy is out of range (1-280)." });
    }

    const dailyTip = await DailyPregnancyTip.findOne({ day: daysElapsed });

    if (!dailyTip) {
      return res.status(404).json({ message: "Tip for this day not found" });
    }

    // Determine the tip based on language preference
    const tip =
      languagePreference === "Español" ? dailyTip.tipSpanish : dailyTip.tip;

    res.json({ day: daysElapsed, tip });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
