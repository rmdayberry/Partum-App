import express from "express";
import Appointment from "../models/appointmentsModel.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new appointment
router.post("/", authenticate, async (req, res) => {
  const { id: userId } = req.user; // Extract userId from the authenticated user
  const { title, date, time, location, notes } = req.body;
  console.log("Received appointment request:", req.body);

  if (!title || !date || !time || !location) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  try {
    const newAppointment = new Appointment({
      userId: req.user.id,
      title,
      date,
      time,
      location,
      notes,
    });
    await newAppointment.save();
    res.status(201).json({
      message: "Appointment added successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add appointment", error: error.message });
  }
});

// Fetch the user's next appointment
router.get("/next", authenticate, async (req, res) => {
  const { id: userId } = req.user;
  console.log("Fetching appointments for user:", userId);

  try {
    const nextAppointment = await Appointment.findOne({
      userId,
      date: { $gte: new Date() },
    }).sort({ date: 1, time: 1 });

    if (!nextAppointment) {
      return res.status(404).json({ message: "No upcoming appointments" });
    }

    res.json(nextAppointment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
});

// Fetch all appointments for the authenticated user
router.get("/", authenticate, async (req, res) => {
  const { id: userId } = req.user; // Extract userId from the authenticated token
  console.log("Fetching appointments for user:", userId);

  try {
    const appointments = await Appointment.find({ userId }).sort({
      date: 1,
      time: 1,
    });
    console.log("Fetched appointments:", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch appointments", error: error.message });
  }
});

// Update an appointment
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, date, time, location, notes } = req.body;

  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, date, time, location, notes },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update appointment", error: error.message });
  }
});

// Delete an appointment
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  console.log("Received DELETE request for appointment ID:", id);
  console.log("User ID from token:", req.user.id);

  try {
    const deletedAppointment = await Appointment.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deletedAppointment) {
      console.log("Appointment not found or user unauthorized");
      return res.status(404).json({ message: "Appointment not found" });
    }

    console.log("Appointment successfully deleted:", deletedAppointment);
    res.json({
      message: "Appointment deleted successfully",
      appointment: deletedAppointment,
    });
  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete appointment", error: error.message });
  }
});

export default router;
