import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Check demo admin
    if (cleanEmail === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        id: "USR-ADMIN",
        name: "Admin User",
        email: "admin@gmail.com",
        isAdmin: true,
        createdAt: "Jan 1, 2026",
      };

      onLogin(adminUser);
      navigate("/dashboard");
      return;
    }

    // Check registered users from localStorage
    const savedUsers = JSON.parse(
      localStorage.getItem("forever_users") || "[]"
    );

    const foundUser = savedUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (foundUser) {
      onLogin(foundUser);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side */}
        <div className="login-left">
          <div className="login-brand">
            FOREVER<span>.</span>
          </div>

          <div className="login-left-content">
            <h1>Welcome Back</h1>
            <p>
              Login to access your personal dashboard, view your purchased
              orders, and manage your wishlist.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-box">
            <div className="login-heading">
              <h2>Login</h2>
              <p>Enter your details to access your account</p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {/* Error */}
              {error && <p className="login-error">{error}</p>}

              {/* Login Button */}
              <button type="submit" className="login-button">
                LOGIN
              </button>
            </form>

            {/* Create account link */}
            <div style={{ textAlign: "center", marginTop: "18px" }}>
              <span style={{ color: "#64748b", fontSize: "14px" }}>
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                style={{
                  color: "#1e293b",
                  fontWeight: 600,
                  fontSize: "14px",
                  textDecoration: "underline",
                }}
              >
                Create Account
              </Link>
            </div>

            {/* Demo Login Details */}
            <div className="demo-login">
              <p>Demo Admin Credentials:</p>
              <span>Email: admin@gmail.com</span>
              <span>Password: admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;