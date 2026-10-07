import './Homebanner.css';

const Homebanner = () => {
  return (
    <section className="home-banner" aria-label="Spring collection banner">
      <div className="banner-content">
        <p className="banner-kicker">SPRING</p>
        <h1 className="banner-title">COLLECTION</h1>

        <p className="banner-price">
          Starting from <span>$ 39.99</span>
        </p>

        <button type="button" className="shop-btn">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Homebanner;
