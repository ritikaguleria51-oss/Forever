import { useMemo, useState } from "react";
import ProductCard from "../componenets/Productcards/ProductCard";
import products from "../componenets/ProductData";
import "./Collections.css";

const productTypes = [...new Set(products.map((product) => product.type))];

function Collections({ addToCart, wishlist = [], toggleWishlist }) {
  const [search, setSearch] = useState("");
  const [clothingSelected, setClothingSelected] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        !query ||
        `${product.name} ${product.description}`.toLowerCase().includes(query);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(product.type);

      return clothingSelected && matchesSearch && matchesType;
    });

    if (sortBy === "price-low") {
      return filteredProducts.sort((first, second) => first.price - second.price);
    }

    if (sortBy === "price-high") {
      return filteredProducts.sort((first, second) => second.price - first.price);
    }

    if (sortBy === "name") {
      return filteredProducts.sort((first, second) => first.name.localeCompare(second.name));
    }

    return filteredProducts;
  }, [clothingSelected, search, selectedTypes, sortBy]);

  const toggleType = (type) => {
    setSelectedTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((currentType) => currentType !== type)
        : [...currentTypes, type]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setClothingSelected(true);
    setSelectedTypes([]);
    setSortBy("newest");
  };

  return (
    <main className="collection-page">
      <header className="collection-heading">
        <h1>ALL COLLECTIONS</h1>
        <p>
          Explore everyday essentials and find something that feels just right.
        </p>
      </header>

      <div className="collection-layout">
        <aside className="collection-filters" aria-label="Product filters">
          <div className="collection-filter-heading">
            <h2>FILTERS</h2>
            <button type="button" onClick={clearFilters}>
              Clear all
            </button>
          </div>

          <label className="collection-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.2" />
              <path d="m15.4 15.4 4.2 4.2" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </label>

          <fieldset className="collection-filter-group">
            <legend>CATEGORIES</legend>
            <label className="collection-checkbox">
              <input
                type="checkbox"
                checked={clothingSelected}
                onChange={(event) => setClothingSelected(event.target.checked)}
              />
              <span>Clothing</span>
              <small>{products.length}</small>
            </label>
          </fieldset>

          <fieldset className="collection-filter-group">
            <legend>TYPE</legend>
            {productTypes.map((type) => {
              const count = products.filter((product) => product.type === type).length;

              return (
                <label className="collection-checkbox" key={type}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span>{type}</span>
                  <small>{count}</small>
                </label>
              );
            })}
          </fieldset>
        </aside>

        <section className="collection-results" aria-labelledby="collection-results-title">
          <div className="collection-results-heading">
            <div>
              <h2 id="collection-results-title">ALL PRODUCTS</h2>
              <p>{visibleProducts.length} items</p>
            </div>
            <label className="collection-sort">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="collection-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="collection-empty">
              <h3>No products found</h3>
              <p>Try another search or clear your filters.</p>
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Collections;
