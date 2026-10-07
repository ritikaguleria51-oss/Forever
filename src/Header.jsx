import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const Header = ({
  isLoggedIn,
  currentUser,
  onLogout,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  const location = useLocation();

  return (
    <header className="top-header">
      <Link to="/" className="header-brand" aria-label="Forever brand" style={{ textDecoration: "none" }}>
        <span className="brand-text">FOREVER</span>
        <span className="brand-dot" aria-hidden="true"></span>
      </Link>

      <nav className="header-nav" aria-label="Main navigation">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        >
          About
        </Link>

        <Link
          to="/collections"
          className={`nav-link ${location.pathname === "/collections" ? "active" : ""}`}
        >
          Collections
        </Link>

        <Link
          to="/contact"
          className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
        >
          Contact
        </Link>
      </nav>

      <div className="header-right">
        {/* Authentication area */}
        {isLoggedIn ? (
          <div className="auth-block user-logged-block" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              to="/dashboard"
              className="header-user-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#0f172a",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
              }}
            >
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#0f172a",
                  color: "#ffffff",
                  fontSize: "11px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
              <span>{currentUser?.name?.split(" ")[0] || "Account"}</span>
            </Link>

            <button
              type="button"
              onClick={onLogout}
              style={{
                border: "none",
                background: "transparent",
                color: "#64748b",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                padding: "4px 8px"
              }}
              title="Logout"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-block">
            <Link to="/login">Login</Link>
            <span className="auth-slash">/</span>
            <Link to="/register">Register</Link>
          </div>
        )}

        <div className="header-icons" aria-label="Header actions">
          {/* Wishlist Icon */}
          <Link
            to={isLoggedIn ? "/dashboard?tab=wishlist" : "/login"}
            className="icon-btn wishlist-header-btn"
            aria-label="Wishlist"
            title="Wishlist"
            style={{ position: "relative", color: "#1c1c1c", textDecoration: "none" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill={wishlistCount > 0 ? "#ef4444" : "none"}
              stroke={wishlistCount > 0 ? "#ef4444" : "currentColor"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "22px", height: "22px" }}
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="badge-count" style={{ background: "#ef4444" }}>
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="icon-btn cart-btn"
            aria-label="Cart"
            style={{ position: "relative" }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 6h2l1.6 8.3A2 2 0 0 0 8.5 16h8.9a2 2 0 0 0 1.9-1.5L20.8 8H6.3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="18.8" r="1.4" fill="currentColor" />
              <circle cx="17" cy="18.8" r="1.4" fill="currentColor" />
            </svg>
            {cartCount > 0 && (
              <span className="badge-count">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;