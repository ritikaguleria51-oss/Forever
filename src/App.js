import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collections from "./pages/Collections";

import Cart from "./componenets/cartpage/cart";
import ProductDetails from "./componenets/ProductDetails/ProductDetails";
import Dashboard from "./componenets/Dashboard/Dashboard";
import Login from "./componenets/Login/Login";
import Register from "./componenets/Login/Register";

import womenBlazer from "./assest/images/ps9on9urdrorj7qmf1ub.png";
import menTrousers from "./assest/images/ybrndfjkuwfxdq6tgpk4.png";

function App() {
  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("currentUser");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("forever_cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      const user = savedUser ? JSON.parse(savedUser) : null;
      const key = user ? `forever_wishlist_${user.email}` : "forever_wishlist_guest";
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Orders / Purchased items state
  const [orders, setOrders] = useState(() => {
    try {
      const savedUser = localStorage.getItem("currentUser");
      const user = savedUser ? JSON.parse(savedUser) : null;
      const key = user ? `forever_orders_${user.email}` : "forever_orders_guest";
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);

      // Default sample purchased orders for admin demo
      if (user?.email === "admin@gmail.com") {
        return [
          {
            id: "#ORD-5012",
            date: "Oct 5, 2026",
            status: "Delivered",
            total: 650,
            subtotal: 600,
            shipping: 50,
            items: [
              {
                id: 4,
                name: "Women Regular Fit Blazer",
                price: 650,
                quantity: 1,
                category: "Clothing",
                image: womenBlazer,
              },
            ],
          },
          {
            id: "#ORD-5011",
            date: "Sep 28, 2026",
            status: "Delivered",
            total: 450,
            subtotal: 400,
            shipping: 50,
            items: [
              {
                id: 2,
                name: "Men Tapered Fit Flat-Front Trousers",
                price: 450,
                quantity: 1,
                category: "Clothing",
                image: menTrousers,
              },
            ],
          },
        ];
      }
      return [];
    } catch (e) {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("forever_cart", JSON.stringify(cart));
  }, [cart]);

  /* ---------------------------
     LOGIN / REGISTER
  --------------------------- */
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Load user's specific orders
    const userOrdersKey = `forever_orders_${user.email}`;
    const savedOrders = localStorage.getItem(userOrdersKey);
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        setOrders([]);
      }
    } else if (user.email === "admin@gmail.com") {
      setOrders([
        {
          id: "#ORD-5012",
          date: "Oct 5, 2026",
          status: "Delivered",
          total: 650,
          subtotal: 600,
          shipping: 50,
          items: [
            {
              id: 4,
              name: "Women Regular Fit Blazer",
              price: 650,
              quantity: 1,
              category: "Clothing",
              image: womenBlazer,
            },
          ],
        },
      ]);
    } else {
      setOrders([]);
    }

    // Load user's specific wishlist
    const userWishlistKey = `forever_wishlist_${user.email}`;
    const savedWishlist = localStorage.getItem(userWishlistKey);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        setWishlist([]);
      }
    } else {
      setWishlist([]);
    }
  };

  /* ---------------------------
     LOGOUT
  --------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setOrders([]);
    setWishlist([]);
  };

  /* ---------------------------
     CART HANDLERS
  --------------------------- */
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  /* ---------------------------
     PURCHASE / CHECKOUT
  --------------------------- */
  const handleCheckout = (newOrder) => {
    setOrders((previousOrders) => {
      const updatedOrders = [newOrder, ...previousOrders];
      const key = currentUser
        ? `forever_orders_${currentUser.email}`
        : "forever_orders_guest";
      localStorage.setItem(key, JSON.stringify(updatedOrders));
      return updatedOrders;
    });
    setCart([]);
  };

  /* ---------------------------
     WISHLIST HANDLERS
  --------------------------- */
  const toggleWishlist = (product) => {
    setWishlist((previousWishlist) => {
      const exists = previousWishlist.some((item) => item.id === product.id);
      let updated;
      if (exists) {
        updated = previousWishlist.filter((item) => item.id !== product.id);
      } else {
        updated = [...previousWishlist, product];
      }

      const key = currentUser
        ? `forever_wishlist_${currentUser.email}`
        : "forever_wishlist_guest";
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((previousWishlist) => {
      const updated = previousWishlist.filter((item) => item.id !== productId);
      const key = currentUser
        ? `forever_wishlist_${currentUser.email}`
        : "forever_wishlist_guest";
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BrowserRouter>
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={handleLogout}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
      />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* COLLECTIONS */}
        <Route
          path="/collections"
          element={
            <Collections
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        {/* SINGLE PRODUCT */}
        <Route
          path="/product/:id"
          element={
            <ProductDetails
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              isLoggedIn={isLoggedIn}
              onCheckout={handleCheckout}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register onRegister={handleLogin} />
            )
          }
        />

        {/* USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard
                currentUser={currentUser}
                orders={orders}
                wishlist={wishlist}
                onLogout={handleLogout}
                addToCart={addToCart}
                removeFromWishlist={removeFromWishlist}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* UNKNOWN URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;