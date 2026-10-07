const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: "https://forever-seven-lime.vercel.app",
    credentials: true,
  })
);

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
  res.json({
    message: "Forever Backend is running!",
  });
});

// =========================
// START SERVER
// =========================
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});