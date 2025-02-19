const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const pregnancyRoutes = require("./routes/pregnancyRoutes");
const appointmentsRoutes = require("./routes/appointmentsRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// Load environment variables
dotenv.config();
require("dotenv").config();
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET);

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: Missing MONGO_URI environment variable");
  process.exit(1);
}

// Initialize the app
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // Frontend React
  "https://expo.dev/@rdayberry/partum", // Expo EAS Frontend
  "https://partum-app.onrender.com", // Backend
  "http://10.0.0.106:19000", // Expo development server
  "https://partum-7qo0sao4z-reagans-projects-2fcbf7b0.vercel.app", //Vercel Frontend,
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB connection
const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/api", pregnancyRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running..." });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
