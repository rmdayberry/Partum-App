const express = require("express");
const Appointment = require("../models/appointmentsModel");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

// Add a new appointment
router.post("/", authenticate, async (req, res) => {
  const { userId } = req.user; // Extract userId from the authenticated user
  const { title, date, time, location, notes } = req.body;

  try {
    const newAppointment = new Appointment({ userId, title, date, time, location, notes });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment added successfully", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add appointment", error: error.message });
  }
});

// Fetch the user's next appointment
router.get("/next", authenticate, async (req, res) => {
  const { userId } = req.user;

  try {
    const nextAppointment = await Appointment.find({ userId, date: { $gte: new Date() } })
      .sort({ date: 1, time: 1 })
      .limit(1);

    if (!nextAppointment.length) {
      return res.status(404).json({ message: "No upcoming appointments" });
    }

    res.json(nextAppointment[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
});

module.exports = router;
