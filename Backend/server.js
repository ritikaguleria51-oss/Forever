const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================
app.use(express.json());

// =========================
// DATABASE
// =========================
connectDB();

// =========================
// AUTH ROUTES
// =========================
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Forever Backend is running!");
});

// =========================
// START SERVER
// =========================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});