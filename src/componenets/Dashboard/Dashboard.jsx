import { useState, useMemo } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Dashboard.css";

function Dashboard({
  currentUser,
  orders = [],
  wishlist = [],
  onLogout,
  addToCart,
  removeFromWishlist,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "orders";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Profile editable state
  const [profileName, setProfileName] = useState(currentUser?.name || "Customer");
  const [profilePhone, setProfilePhone] = useState(
    localStorage.getItem(`phone_${currentUser?.email}`) || "+1 (555) 019-2834"
  );
  const [profileAddress, setProfileAddress] = useState(
    localStorage.getItem(`address_${currentUser?.email}`) ||
      "742 Evergreen Terrace, Springfield, OR"
  );
  const [profileSavedMsg, setProfileSavedMsg] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem(`phone_${currentUser?.email}`, profilePhone);
    localStorage.setItem(`address_${currentUser?.email}`, profileAddress);

    // Update currentUser name in storage if changed
    if (profileName.trim() && currentUser) {
      const updatedUser = { ...currentUser, name: profileName.trim() };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // Also update in users list
      const savedUsers = JSON.parse(
        localStorage.getItem("forever_users") || "[]"
      );
      const updatedUsers = savedUsers.map((u) =>
        u.email === currentUser.email ? { ...u, name: profileName.trim() } : u
      );
      localStorage.setItem("forever_users", JSON.stringify(updatedUsers));
    }

    setProfileSavedMsg("Profile information saved successfully! ✓");
    setTimeout(() => setProfileSavedMsg(""), 3000);
  };

  // Calculate stats
  const totalPurchasedCount = useMemo(() => {
    return orders.reduce((sum, order) => {
      const itemCount = (order.items || []).reduce(
        (subSum, item) => subSum + (item.quantity || 1),
        0
      );
      return sum + itemCount;
    }, 0);
  }, [orders]);

  const totalSpent = useMemo(() => {
    return orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  }, [orders]);

  // Admin store stats (if admin user)
  const isAdmin = currentUser?.email === "admin@gmail.com" || currentUser?.isAdmin;

  return (
    <div className="user-dashboard-layout">
      {/* Sidebar */}
      <aside className="user-dash-sidebar">
        <div className="user-dash-brand">
          <Link to="/">
            FOREVER<span className="brand-dot-dash">.</span>
          </Link>
        </div>

        {/* User Mini Card */}
        <div className="user-mini-card">
          <div className="user-avatar-circle">
            {profileName?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="user-mini-details">
            <strong>{profileName}</strong>
            <span>{currentUser?.email || "user@example.com"}</span>
            <span className="user-tier-tag">
              {isAdmin ? "Store Administrator" : "Active Member"}
            </span>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="user-dash-nav">
          <button
            type="button"
            className={`user-nav-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => handleTabChange("orders")}
          >
            <span className="user-nav-icon">🛍️</span>
            <span>Purchased Items</span>
            {orders.length > 0 && (
              <span className="user-nav-badge">{orders.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`user-nav-btn ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => handleTabChange("wishlist")}
          >
            <span className="user-nav-icon">❤️</span>
            <span>My Wishlist</span>
            {wishlist.length > 0 && (
              <span className="user-nav-badge">{wishlist.length}</span>
            )}
          </button>

          <button
            type="button"
            className={`user-nav-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => handleTabChange("profile")}
          >
            <span className="user-nav-icon">👤</span>
            <span>Profile & Address</span>
          </button>

          {isAdmin && (
            <button
              type="button"
              className={`user-nav-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => handleTabChange("analytics")}
            >
              <span className="user-nav-icon">📊</span>
              <span>Store Analytics</span>
            </button>
          )}
        </nav>

        {/* Bottom Actions */}
        <div className="user-dash-sidebar-bottom">
          <Link to="/" className="user-nav-btn back-store-btn">
            <span className="user-nav-icon">🏠</span>
            <span>Back to Store</span>
          </Link>

          <button
            type="button"
            className="user-nav-btn logout-dash-btn"
            onClick={onLogout}
          >
            <span className="user-nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="user-dash-main">
        {/* Top Header Bar */}
        <header className="user-dash-topbar">
          <div>
            <h1>
              {activeTab === "orders" && "Purchased Items & Orders"}
              {activeTab === "wishlist" && "Saved Wishlist Items"}
              {activeTab === "profile" && "Account & Delivery Details"}
              {activeTab === "analytics" && "Store Analytics (Admin)"}
            </h1>
            <p>
              Welcome back, <strong>{profileName}</strong>! Manage your purchases
              and wishlist.
            </p>
          </div>

          <div className="dash-quick-actions">
            <Link to="/collections" className="browse-store-link">
              + Browse Collections
            </Link>
          </div>
        </header>

        {/* Stats Row */}
        <section className="user-stats-row">
          <div className="user-stat-card">
            <div className="stat-card-icon">🛍️</div>
            <div className="stat-card-text">
              <span className="stat-card-label">Purchased Items</span>
              <strong className="stat-card-value">
                {totalPurchasedCount} items
              </strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-card-icon">📦</div>
            <div className="stat-card-text">
              <span className="stat-card-label">Total Orders</span>
              <strong className="stat-card-value">
                {orders.length} orders
              </strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-card-icon">❤️</div>
            <div className="stat-card-text">
              <span className="stat-card-label">Saved in Wishlist</span>
              <strong className="stat-card-value">
                {wishlist.length} items
              </strong>
            </div>
          </div>

          <div className="user-stat-card">
            <div className="stat-card-icon">💳</div>
            <div className="stat-card-text">
              <span className="stat-card-label">Total Spent</span>
              <strong className="stat-card-value">${totalSpent}</strong>
            </div>
          </div>
        </section>

        {/* ========================================================
            TAB 1: PURCHASED ITEMS & ORDERS
           ======================================================== */}
        {activeTab === "orders" && (
          <section className="dash-section-body">
            {orders.length === 0 ? (
              <div className="dash-empty-state">
                <div className="empty-icon-circle">🛍️</div>
                <h3>No purchases yet</h3>
                <p>
                  You haven't purchased any items yet. Browse our collections,
                  add items to cart and checkout to see your purchased items
                  here.
                </p>
                <Link to="/collections" className="dash-primary-btn">
                  Explore Collections
                </Link>
              </div>
            ) : (
              <div className="purchased-orders-list">
                {orders.map((order) => (
                  <article key={order.id} className="purchased-order-card">
                    {/* Order Header */}
                    <div className="order-card-header">
                      <div className="order-id-meta">
                        <span className="order-tag">Order</span>
                        <strong className="order-id-code">{order.id}</strong>
                        <span className="order-date-text">
                          Placed on {order.date}
                        </span>
                      </div>

                      <div className="order-status-badge-wrap">
                        <span
                          className={`order-status-pill ${
                            order.status?.toLowerCase() || "confirmed"
                          }`}
                        >
                          ● {order.status || "Confirmed"}
                        </span>
                        <strong className="order-total-amount">
                          ${order.total}
                        </strong>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="order-items-grid">
                      {(order.items || []).map((item, idx) => (
                        <div key={`${order.id}-${item.id}-${idx}`} className="order-item-row">
                          <div className="order-item-img-box">
                            <img src={item.image} alt={item.name} />
                          </div>

                          <div className="order-item-info">
                            <h4>{item.name}</h4>
                            <p className="order-item-meta">
                              Category: {item.category || "Apparel"} • Qty:{" "}
                              <strong>{item.quantity || 1}</strong>
                            </p>
                            <span className="order-item-price">
                              ${item.price} each
                            </span>
                          </div>

                          <div className="order-item-subtotal">
                            <strong>${item.price * (item.quantity || 1)}</strong>
                          </div>

                          <div className="order-item-actions">
                            <button
                              type="button"
                              className="buy-again-btn"
                              onClick={() => {
                                addToCart(item);
                                navigate("/cart");
                              }}
                            >
                              Buy Again ↺
                            </button>
                            <Link
                              to={`/product/${item.id}`}
                              className="view-item-btn"
                            >
                              View Item
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TAB 2: WISHLIST ITEMS
           ======================================================== */}
        {activeTab === "wishlist" && (
          <section className="dash-section-body">
            {wishlist.length === 0 ? (
              <div className="dash-empty-state">
                <div className="empty-icon-circle">❤️</div>
                <h3>Your Wishlist is Empty</h3>
                <p>
                  Explore our products and click the heart icon on any product
                  to save it here for later.
                </p>
                <Link to="/collections" className="dash-primary-btn">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="dash-wishlist-grid">
                {wishlist.map((product) => (
                  <div key={product.id} className="dash-wishlist-card">
                    <div className="wishlist-img-box">
                      <img src={product.image} alt={product.name} />
                      <button
                        type="button"
                        className="wishlist-remove-icon-btn"
                        onClick={() => removeFromWishlist(product.id)}
                        title="Remove from wishlist"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="wishlist-card-content">
                      <span className="wishlist-category">
                        {product.category || "Apparel"}
                      </span>
                      <h3>{product.name}</h3>
                      <p className="wishlist-desc">{product.description}</p>
                      <strong className="wishlist-price">
                        ${product.price}
                      </strong>

                      <div className="wishlist-card-actions">
                        <button
                          type="button"
                          className="move-to-cart-btn"
                          onClick={() => {
                            addToCart(product);
                            removeFromWishlist(product.id);
                          }}
                        >
                          Move to Cart 🛒
                        </button>
                        <button
                          type="button"
                          className="wishlist-delete-btn"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            TAB 3: PROFILE & SHIPPING ADDRESS
           ======================================================== */}
        {activeTab === "profile" && (
          <section className="dash-section-body">
            <div className="dash-profile-card">
              <h2>My Profile Details</h2>
              <p className="profile-subtitle">
                Manage your account credentials and default delivery address.
              </p>

              {profileSavedMsg && (
                <div className="profile-saved-banner">{profileSavedMsg}</div>
              )}

              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="profile-form-grid">
                  <div className="form-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={currentUser?.email || ""}
                      disabled
                      title="Email cannot be changed"
                    />
                    <small className="field-hint">
                      Email is linked to your account
                    </small>
                  </div>

                  <div className="form-field">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                    />
                  </div>

                  <div className="form-field">
                    <label>Default Shipping Address</label>
                    <textarea
                      rows={3}
                      value={profileAddress}
                      onChange={(e) => setProfileAddress(e.target.value)}
                      placeholder="Street, City, State, ZIP code"
                    />
                  </div>
                </div>

                <div className="profile-btn-wrap">
                  <button type="submit" className="dash-primary-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* ========================================================
            TAB 4: STORE ANALYTICS (ADMIN ONLY)
           ======================================================== */}
        {activeTab === "analytics" && isAdmin && (
          <section className="dash-section-body">
            <div className="admin-analytics-box">
              <h2>Store Performance Overview</h2>
              <p>Platform metrics and order fulfillment overview.</p>

              <div className="admin-stats-grid">
                <div className="admin-stat-item">
                  <span>Total Store Revenue</span>
                  <strong>$12,450</strong>
                  <small className="stat-positive">+10.8% this month</small>
                </div>
                <div className="admin-stat-item">
                  <span>Registered Users</span>
                  <strong>
                    {JSON.parse(localStorage.getItem("forever_users") || "[]")
                      .length + 1}
                  </strong>
                  <small className="stat-positive">+15.3% growth</small>
                </div>
                <div className="admin-stat-item">
                  <span>Total Products</span>
                  <strong>5</strong>
                  <small>Active catalog</small>
                </div>
                <div className="admin-stat-item">
                  <span>Total System Orders</span>
                  <strong>{orders.length + 120}</strong>
                  <small className="stat-positive">+12.5% increase</small>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;