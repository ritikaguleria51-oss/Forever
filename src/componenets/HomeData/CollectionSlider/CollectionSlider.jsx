import { useEffect, useRef, useState } from "react";
import CollectionCard from "../CollectionCard/CollectionCard";
import "./CollectionSlider.css";

function CollectionSlider({
  products,
  addToCart,
  wishlist = [],
  toggleWishlist,
}) {
  const wrapperRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!wrapperRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = wrapperRef.current.getBoundingClientRect();
          const totalScroll =
            wrapperRef.current.offsetHeight - window.innerHeight;

          if (totalScroll > 0) {
            const currentScroll = -rect.top;
            const ratio = Math.max(0, Math.min(1, currentScroll / totalScroll));
            setScrollProgress(ratio);

            const index = Math.min(
              products.length - 1,
              Math.max(0, Math.round(ratio * (products.length - 1)))
            );
            setActiveIndex(index);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [products.length]);

  const scrollToSlide = (index) => {
    if (!wrapperRef.current) return;
    const containerTop = wrapperRef.current.offsetTop;
    const totalScroll = wrapperRef.current.offsetHeight - window.innerHeight;
    const targetScroll =
      containerTop + (index / (products.length - 1)) * totalScroll;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToSlide(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < products.length - 1) {
      scrollToSlide(activeIndex + 1);
    }
  };

  // Horizontal translation in vw (0 to -(products.length - 1) * 100 vw)
  const translateX = -(scrollProgress * (products.length - 1) * 100);

  return (
    <section
      ref={wrapperRef}
      className="collections-pinned-wrapper"
      style={{
        height: `${100 + (products.length - 1) * 75}vh`,
      }}
      aria-label="Latest Collections Section"
    >
      <div className="collections-sticky-viewport">
        {/* Top Header of the 100vh pinned section */}
        <div className="collections-sticky-header">
          <div className="collections-header-text">
            <span className="collections-eyebrow">NEW ARRIVALS</span>
            <h2 className="collections-title">Latest Collections</h2>
            <p className="collections-sub">
              Scroll down to explore each featured look in our signature collection.
            </p>
          </div>

          <div className="collections-nav-controls">
            <div className="collections-counter" aria-live="polite">
              <span className="counter-current">0{activeIndex + 1}</span>
              <span className="counter-slash">/</span>
              <span className="counter-total">0{products.length}</span>
            </div>

            <div className="collections-arrows">
              <button
                type="button"
                className="collections-arrow-btn"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous product"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                className="collections-arrow-btn"
                onClick={handleNext}
                disabled={activeIndex === products.length - 1}
                aria-label="Next product"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slides Track Viewport */}
        <div className="collections-track-viewport">
          <div
            className="collections-slides-track"
            style={{
              transform: `translate3d(${translateX}vw, 0, 0)`,
            }}
          >
            {products.map((product, index) => {
              const distance = Math.abs(
                scrollProgress * (products.length - 1) - index
              );
              const isCurrent = activeIndex === index;

              return (
                <div
                  key={product.id}
                  className={`collection-slide-item ${
                    isCurrent ? "active-slide" : "inactive-slide"
                  }`}
                  style={{
                    opacity: Math.max(0.4, 1 - distance * 0.65),
                    transform: `scale(${Math.max(0.93, 1 - distance * 0.07)})`,
                  }}
                >
                  <CollectionCard
                    product={product}
                    addToCart={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Progress line & category pills */}
        <div className="collections-bottom-bar">
          <div className="collections-progress-track">
            <div
              className="collections-progress-fill"
              style={{
                width: `${((activeIndex + 1) / products.length) * 100}%`,
              }}
            />
          </div>

          <div className="collections-pills-list">
            {products.map((product, index) => (
              <button
                key={product.id}
                type="button"
                className={`collection-pill-btn ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => scrollToSlide(index)}
                aria-label={`Jump to ${product.name}`}
              >
                <span className="pill-index">0{index + 1}</span>
                <span className="pill-name">{product.type || `Look ${index + 1}`}</span>
              </button>
            ))}
          </div>

          <div className="collections-scroll-hint">
            <span>Scroll to browse</span>
            <svg className="scroll-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionSlider;
