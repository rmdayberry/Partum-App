const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const pregnancyRoutes = require("./routes/pregnancyRoutes");

// Load environment variables
dotenv.config();

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
const allowedOrigins = ["http://localhost:3000"]; // Adjust based on your frontend's origin
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

app.get("/", (req, res) => {
  res.send("API is running...");
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
