import "./Deals.css";

function Deals() {
  return (
    <section className="deals" aria-labelledby="deals-title">
      <header className="deals-heading">
        <span className="deals-eyebrow">HANDPICKED FOR YOU</span>
        <h2 id="deals-title">Best Deals</h2>
        <p>Good design, great finds, and a little something for every space.</p>
      </header>

      <article className="deal-feature">
        <div className="deal-feature-content">
          <span className="deal-label">Deal of the day</span>
          <h3>Perfect fit for your home</h3>
          <p>
            Bring home a look you love, with selected favorites starting from{" "}
            <strong>$39.99</strong>.
          </p>
          <button className="deal-button" type="button">
            Shop the deal <span aria-hidden="true">→</span>
          </button>
        </div>
        <span className="deal-discount" aria-label="Special offer">
          TODAY&apos;S
          <strong> PICK</strong>
        </span>
      </article>

      <div className="deal-tiles">
        <article className="deal-tile deal-tile-comfort">
          <div className="deal-tile-content">
            <span>Make yourself at home</span>
            <h3>Comfort, thoughtfully chosen.</h3>
            <button className="deal-text-link" type="button">
              Explore the edit <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
        <article className="deal-tile deal-tile-details">
          <div className="deal-tile-content">
            <span>Small details, lovely spaces</span>
            <h3>Find your new favorite.</h3>
            <button className="deal-text-link" type="button">
              Discover more <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Deals;
