const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// ✅ Middleware
app.use(cors({
  origin: "https://campus-client-nine.vercel.app",
  methods:["GET","POST","DELETE"]
}));

app.use(express.json()); // Parse incoming JSON

// ✅ MongoDB connection

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// ✅ Routes
app.use("/api/notices", require("./routes/notices"));

app.get("/", (req, res) => {
  res.send("Backend working, DB connected");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});