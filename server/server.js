import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import pregnancyRoutes from "./routes/pregnancyRoutes.js";
import appointmentsRoutes from "./routes/appointmentsRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

// Load environment variables
dotenv.config();
console.log("JWT_SECRET Loaded:", process.env.JWT_SECRET);

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("Error: Missing MONGO_URI environment variable");
  process.exit(1);
}

// Initialize the app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(express.json()); // Parses JSON bodies

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // Local frontend development
  "https://expo.dev/@rdayberry/partum", // Expo EAS Frontend
  "https://partum-app.onrender.com", // Backend
  "http://10.0.0.106:19000", // Expo development server
  "https://partum-q9wvd43mv-reagans-projects-2fcbf7b0.vercel.app", // Vercel Frontend
  "http://localhost:8081",
  "http://localhost:19006",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error("🚫 Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// MongoDB connection
const PORT = process.env.PORT || 5002;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);
app.use("/api", pregnancyRoutes);
app.use("/appointments", appointmentsRoutes);
app.use("/feedback", feedbackRoutes);

// API Health Check
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running..." });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
