import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  isLoggedIn,
  onCheckout,
}) {
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState("");

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shipping = cart.length > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      alert("Please login or create an account to complete your purchase.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) return;

    const newOrderId = `#ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      items: [...cart],
      subtotal,
      shipping,
      total,
      status: "Confirmed",
    };

    if (onCheckout) {
      onCheckout(newOrder);
    }

    setPlacedOrderId(newOrderId);
    setOrderSuccess(true);
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>

      {orderSuccess ? (
        <div className="order-success-box" style={{
          background: "#ffffff",
          border: "1px solid #d1fae5",
          borderRadius: "16px",
          padding: "48px 30px",
          textAlign: "center",
          maxWidth: "520px",
          margin: "40px auto",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div style={{ fontSize: "54px", marginBottom: "14px" }}>🎉</div>
          <h2 style={{ fontSize: "26px", color: "#065f46", margin: "0 0 8px" }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: "#4b5563", fontSize: "15px", lineHeight: "1.5" }}>
            Thank you for your purchase! Your order <strong>{placedOrderId}</strong> has been confirmed and added to your purchased items list.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
            <button
              type="button"
              onClick={() => navigate("/dashboard?tab=orders")}
              style={{
                padding: "12px 24px",
                background: "#0f172a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer"
              }}
            >
              View in Dashboard →
            </button>
            <Link
              to="/collections"
              style={{
                padding: "12px 20px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#1e293b",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Explore our collections and add styles you love to your cart.</p>
          <Link
            to="/collections"
            style={{
              display: "inline-block",
              marginTop: "16px",
              padding: "12px 24px",
              background: "#0f172a",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: 600
            }}
          >
            Explore Collections →
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {/* Cart Products */}
          <div className="cart-items">
            {cart.map((product) => (
              <div className="cart-item" key={product.id}>
                <img src={product.image} alt={product.name} />

                <div className="cart-item-info">
                  <h3>{product.name}</h3>
                  <p className="cart-price">${product.price}</p>

                  <div className="quantity-box">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(product.id)}
                    >
                      −
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      type="button"
                      onClick={() => increaseQuantity(product.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-total">
                  <strong>${product.price * product.quantity}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <h2>Cart Total</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>${subtotal}</strong>
            </div>

            <div className="summary-row">
              <span>Estimated Shipping</span>
              <strong>${shipping}</strong>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Total</span>
              <strong>${total}</strong>
            </div>

            <button
              type="button"
              className="checkout-btn"
              onClick={handleCheckoutClick}
            >
              Checkout ({cart.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;