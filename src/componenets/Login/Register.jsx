import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Fetch existing users from localStorage
      const existingUsers = JSON.parse(
        localStorage.getItem("forever_users") || "[]"
      );

      const userExists = existingUsers.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (userExists) {
        setError("An account with this email already exists. Please login.");
        setLoading(false);
        return;
      }

      // Create new user object
      const newUser = {
        id: `USR-${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };

      // Save to localStorage
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("forever_users", JSON.stringify(updatedUsers));

      setSuccess("Account created successfully! Redirecting to dashboard...");

      setTimeout(() => {
        if (onRegister) {
          onRegister(newUser);
        }
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <p>Register to manage your orders, purchases and wishlist</p>

        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Ritika Guleria"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="e.g. ritika@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "REGISTER"}
          </button>
        </form>

        <div className="register-login">
          <p>Already have an account?</p>
          <button type="button" onClick={() => navigate("/login")}>
            Login to your account →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;