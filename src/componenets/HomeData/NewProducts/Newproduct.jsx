import './Newproduct.css';

const Newproduct = () => {
  return (
    <section className="newproduct-section" aria-label="New products section">
      <article className="promo-card promo-chair">
        <div className="promo-content">
          <span className="promo-kicker">MODERN</span>
          <h2 className="promo-title">FURNITURE</h2>
          <p className="promo-price">
            Starting from <span>$ 39.99</span>
          </p>
          <button type="button" className="promo-btn">
            Shop Now
          </button>
        </div>
      </article>

      <article className="promo-card promo-lighting">
        <div className="promo-content">
          <span className="promo-kicker">NEW</span>
          <h2 className="promo-title">LIGHTING</h2>
          <p className="promo-price">
            Starting from <span>$ 39.99</span>
          </p>
          <button type="button" className="promo-btn">
            Shop Now
          </button>
        </div>
      </article>
    </section>
  );
};

export default Newproduct;
