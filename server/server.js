const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001"], // allow frontend origin
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));
app.use(express.json()); // Parse incoming JSON

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection failed", err));

// ✅ Routes
app.use("/api/notices", require("./routes/notices"));

app.get("/", (req, res) => {
  res.send("Backend working, DB connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});