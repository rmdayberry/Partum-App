require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const authRoutes = require("./routes/auth");

//Middleware for JSON
app.use(express.json());

//Authentication Routes
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

//test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend and backend are connected!" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
