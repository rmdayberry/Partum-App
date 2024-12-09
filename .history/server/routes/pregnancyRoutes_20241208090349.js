const express = require("express");
const User = require("../models/userModel");
const WhatToExpectWeekly = require("../models/WhatToExpect");
const router = express.Router();

//Pregnancy progress endpoint
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

//Endpoint to set due date
router.put("/set-due-date/:userId", async (req, res) => {
  try {
    const { dueDate } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { dueDate },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json({ message: "Due date updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Endpoint to fetch weekly tips by userId
router.get("/whatToExpectWeekly/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const dueDate = new Date(user.dueDate);
    const startDate = new Date(dueDate.getTime() - 280 * 24 * 60 * 60 * 1000); //280 days before due date
    const currentDate = new Date();

    const daysElapsed = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    ); //Days since start of pregnancy
    const currentWeek = Math.min(
      40,
      Math.max(1, Math.floor(daysElapsed / 7) + 1)
    ); //ensure week is between 1-40
    const weeklyTip = await WhatToExpectWeekly.findOne({ week: currentWeek });

    if (!weeklyTip) {
      return res.status(404).json({ message: "Tip for this week not found" });
    }
    res.json({ week: currentWeek, tip: weeklyTip.tip });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//Endpoint to fetch weekly tips by week
router.get("/whatToExpectWeekly/week/:week", async (req, res) => {
  try {
    const week = parseInt(req.params.week, 10); //convert week to interger
    const weeklyTip = await WhatToExpectWeekly.findOne({ week });

    if (!weeklyTip) {
      return res.status(404).json({ message: "Tip for this week not found" });
    }

    res.json({ week, tip: weeklyTip.tip });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
