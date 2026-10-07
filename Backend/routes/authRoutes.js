const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// =========================
// REGISTER
// =========================
router.post("/register", registerUser);

// =========================
// LOGIN
// =========================
router.post("/login", loginUser);

// =========================
// PROTECTED TEST ROUTE
// =========================
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "You are authorized!",
    user: req.user,
  });
});

module.exports = router;