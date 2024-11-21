require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const uri =
  "mongodb+srv://partumUser:17RDNpjdHj87wBTj@partum-cluster.xdqne.mongodb.net/test?retryWrites=true&w=majority&appName=Partum-Cluster";
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

//test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
