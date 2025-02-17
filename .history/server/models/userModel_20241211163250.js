const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dueDate: { type: Date, required: true },
    languagePreference: {
      type: String,
      enum: ["English", "Español"],
      default: "English",
    },
  },
  { timestamps: true }
);

//Hash password before saving
const bcrypt = require("bcrypt");

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
module.exports = mongoose.model("User", userSchema);
