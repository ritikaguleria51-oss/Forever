import { useNavigate } from "react-router-dom";

import "./ProductCard.css";


function ProductCard({ product, addToCart, wishlist = [], toggleWishlist }) {

  const navigate = useNavigate();
  const isWishlisted = wishlist.some((item) => item.id === product.id);


  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };


  const handleAddToCart = (event) => {

    event.stopPropagation();

    addToCart(product);

  };


  return (

    <div
      className="product-card"
      onClick={openProduct}
    >

      <div className="product-image" style={{ position: "relative" }}>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (toggleWishlist) toggleWishlist(product);
          }}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            zIndex: 2,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#ef4444" : "none"}
            stroke={isWishlisted ? "#ef4444" : "#475569"}
            strokeWidth="1.8"
            style={{ width: "16px", height: "16px" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <img
          src={product.image}
          alt={product.name}
        />

      </div>


      <h3>
        {product.name}
      </h3>


      <p>
        {product.description}
      </p>


      <div className="product-rating">

        ★ ★ ★ ★ ☆

        <span>
          ({product.reviews})
        </span>

      </div>


      <div className="product-bottom">

        <button
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart +
        </button>


        <strong>
          ${product.price}
        </strong>

      </div>

    </div>

  );
}


export default ProductCard;