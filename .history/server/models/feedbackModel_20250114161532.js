const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false, // Optional for anonymous feedback
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "new", // new, reviewed, resolved
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
