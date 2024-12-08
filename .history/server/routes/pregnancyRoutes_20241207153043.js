const express = require("express");
const User = require("../models/userModel");
const WhatToExpectWeekly = require("../models/WhatToExpect");
const router= express.Router();

//Pregnancy progress endpoint
router.get("/pregnancy-progress/:userId", async (req, res)=> {
  try {
    const user = await User.findById(req.params.userId);
    if(!user) {
      return res.status(404).json({ message: "User not found"});
    }

    const stripTime = (date) => new Date(date.toISOString().split("T")[0]);

    const dueDate = stripTime(new Date(user.dueDate));
    const currentDate= stripTime(new Date());
    const totalPregnancyDays = 280; // Approx. 40 weeks
  }
})