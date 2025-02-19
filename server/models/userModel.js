import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// ✅ Remove expired tokens (fixes expiry logic)
userSchema.methods.removeExpiredTokens = function () {
  const tokenLifetime = 7 * 24 * 60 * 60 * 1000; // 7 days
  this.refreshTokens = this.refreshTokens.filter((t) => {
    return Date.now() - new Date(t.createdAt).getTime() <= tokenLifetime;
  });
};

const User = mongoose.model("User", userSchema);

export default User;
