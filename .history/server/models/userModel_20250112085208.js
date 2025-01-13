const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    refreshTokens: [
      {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ], // Stores an array of active refresh tokens
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Remove expired tokens (e.g., optional utility function for cleanup)
userSchema.methods.removeExpiredTokens = function () {
  this.refreshTokens = this.refreshTokens.filter((token) => {
    // Customize token expiration logic if needed
    const tokenLifetime = 7 * 24 * 60 * 60 * 1000; // 7 days
    return Date.now() - token.createdAt <= tokenLifetime;
  });
};

module.exports = mongoose.model("User", userSchema);
