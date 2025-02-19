import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true, // Link appointment to the specific user
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema,
  "appointments"
);

export default Appointment;
