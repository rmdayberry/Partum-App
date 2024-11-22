const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dueDate: { type: Date, required: true },
  languagePreference: { type: String, default: "English" },
});

module.exports = mongoose.model("User", userSchema);
