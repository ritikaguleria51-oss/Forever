import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import products from "../ProductData";

import "./ProductDetails.css";


function ProductDetails({ addToCart, wishlist = [], toggleWishlist }) {

  const { id } = useParams();

  const navigate = useNavigate();


  const product = products.find(
    (item) => item.id === Number(id)
  );


  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );

  const isWishlisted = wishlist.some((item) => item.id === product?.id);


  if (!product) {

    return (

      <div className="product-not-found">

        <h2>
          Product Not Found
        </h2>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>

      </div>

    );

  }


  const handleAddToCart = () => {

    addToCart(product);

  };


  const handleToggleWishlist = () => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }
  };


  return (

    <section className="product-details-page">

      <div className="product-details-container">


        {/* Left Side */}

        <div className="product-details-left">

          <div className="product-main-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          <div className="product-thumbnail">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>

        </div>


        {/* Right Side */}

        <div className="product-details-right">


          <h1>
            {product.name}
          </h1>


          <p className="product-category">

            <strong>
              Category:
            </strong>

            {" "}

            {product.category}

          </p>


          <div className="product-detail-rating">

            <span>
              ★ ★ ★ ★ ☆
            </span>

            <strong>
              ({product.reviews})
            </strong>

          </div>


          <h2 className="product-detail-price">
            ${product.price}
          </h2>


          <p className="product-detail-description">
            {product.description}
          </p>


          <div className="available-sizes">

            <p>
              Available Sizes:
            </p>


            <div className="size-options">

              {product.sizes.map((size) => (

                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size
                      ? "size-btn selected"
                      : "size-btn"
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>

              ))}

            </div>

          </div>


          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              type="button"
              className="detail-add-cart"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>

            <button
              type="button"
              onClick={handleToggleWishlist}
              style={{
                padding: "16px 20px",
                background: isWishlisted ? "#fee2e2" : "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
                color: isWishlisted ? "#dc2626" : "#1e293b",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease"
              }}
            >
              <span style={{ fontSize: "16px" }}>{isWishlisted ? "❤️" : "🤍"}</span>
              {isWishlisted ? "Saved" : "Save to Wishlist"}
            </button>
          </div>


          <div className="product-info">

            <p>
              100% Original Products
            </p>

            <p>
              Cash on delivery is available on this product.
            </p>

            <p>
              Easy return and exchange policy within 7 days.
            </p>

            <p>
              Seller assumes all responsibility for this listing.
              Shipping and handling.
            </p>

          </div>


        </div>

      </div>

    </section>

  );
}


export default ProductDetails;