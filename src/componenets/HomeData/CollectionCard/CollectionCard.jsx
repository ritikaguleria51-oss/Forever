import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollectionCard.css";

const splitTitle = (fullName) => {
  if (!fullName) return { prefix: "", highlight: "" };
  const words = fullName.trim().split(/\s+/);
  if (words.length <= 2) {
    return {
      prefix: words[0] || "",
      highlight: words.slice(1).join(" ") || "",
    };
  }
  const prefix = words.slice(0, words.length - 2).join(" ");
  const highlight = words.slice(words.length - 2).join(" ");
  return { prefix, highlight };
};

const renderStars = (rating = 5) => {
  return [1, 2, 3, 4, 5].map((idx) => {
    const isFilled = idx <= rating;
    return (
      <svg
        key={idx}
        className={`collection-star-svg ${isFilled ? "filled" : "empty"}`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <polygon
          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          fill={isFilled ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  });
};

function CollectionCard({ product, addToCart, wishlist = [], toggleWishlist }) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  const handleToggleWishlist = (event) => {
    event.stopPropagation();
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const titleParts = splitTitle(product.name);

  return (
    <article
      className="collection-card"
      onClick={openProduct}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") openProduct();
      }}
    >
      {/* Left visual column */}
      <div className="collection-card-visual">
        {/* Wishlist toggle button */}
        <button
          type="button"
          className="collection-wishlist-toggle"
          onClick={handleToggleWishlist}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#ef4444" : "none"}
            stroke={isWishlisted ? "#ef4444" : "#475569"}
            strokeWidth="1.8"
            style={{ width: "18px", height: "18px" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Style your way script badge */}
        <div className="collection-script-box">
          <span className="script-style">Style</span>
          <div className="script-row">
            <span className="script-yourway">your way</span>
            <svg
              className="script-heart"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5D7387"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Botanical leaf branch doodle at top-left */}
        <svg
          className="collection-doodle-tl"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#7A91A5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 88 C25 62 42 42 78 20" />
          <path d="M28 70 C18 64 14 54 22 48 C30 42 38 52 36 64" />
          <path d="M48 50 C42 38 44 26 52 24 C62 22 64 36 56 46" />
          <path d="M66 32 C70 20 80 16 86 20 C92 24 88 36 76 34" />
          <path d="M20 80 C10 77 8 67 15 62 C21 57 28 66 26 76" />
        </svg>

        {/* Soft pastel arch backdrop */}
        <div className="collection-arch-backdrop" />

        {/* Product image */}
        <div className="collection-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="collection-product-img"
          />
        </div>
      </div>

      {/* Right info column */}
      <div className="collection-card-info">
        {/* Top 4 trust badges */}
        <div className="collection-badges-row">
          <div className="collection-badge">
            <div className="collection-badge-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 3h12l4 6-10 12L2 9z" />
                <path d="M2 9h20" />
                <path d="M10 3l-2 6 4 12 4-12-2-6" />
              </svg>
            </div>
            <span className="collection-badge-text">
              Premium
              <br />
              Quality
            </span>
          </div>

          <div className="collection-badge-sep" />

          <div className="collection-badge">
            <div className="collection-badge-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-11 16z" />
                <path d="M4 13c5.5 0 10.5-2.5 13-7" />
              </svg>
            </div>
            <span className="collection-badge-text">
              Comfortable
              <br />
              Fit
            </span>
          </div>

          <div className="collection-badge-sep" />

          <div className="collection-badge">
            <div className="collection-badge-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="collection-badge-text">
              Trendy
              <br />
              Look
            </span>
          </div>

          <div className="collection-badge-sep" />

          <div className="collection-badge">
            <div className="collection-badge-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <span className="collection-badge-text">
              Durable
              <br />
              Fabric
            </span>
          </div>
        </div>

        {/* Title area */}
        <div className="collection-title-wrap">
          <h3 className="collection-title-prefix">{titleParts.prefix}</h3>
          <h2 className="collection-title-main">{titleParts.highlight}</h2>
          <div className="collection-title-divider" />
        </div>

        {/* Product description */}
        <p className="collection-description">{product.description}</p>

        {/* Ratings row */}
        <div className="collection-ratings-wrap">
          <div className="collection-stars-list">
            {renderStars(product.rating || 5)}
          </div>
          <span className="collection-reviews-count">({product.reviews})</span>
        </div>

        {/* Action pill: Add to cart button & Price */}
        <div className="collection-cta-pill">
          <button
            type="button"
            className={`collection-cta-button ${isAdded ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {isAdded ? "Added to cart ✓" : "Add to cart +"}
          </button>
          <div className="collection-pill-line" />
          <strong className="collection-cta-price">${product.price}</strong>
        </div>

        {/* Corner soft blob & botanical leaf branch doodle */}
        <div className="collection-blob-br" />
        <svg
          className="collection-doodle-br"
          viewBox="0 0 120 120"
          fill="none"
          stroke="#7A91A5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M100 115 C85 85 65 55 30 32" />
          <path d="M76 90 C88 81 92 67 84 61 C74 55 68 69 70 83" />
          <path d="M60 67 C68 53 64 39 56 37 C46 35 44 50 52 61" />
          <path d="M44 47 C40 33 30 29 24 33 C18 37 24 50 36 47" />
          <path d="M86 103 C98 99 102 87 94 83 C86 79 80 89 82 99" />
        </svg>
      </div>
    </article>
  );
}

export default CollectionCard;
