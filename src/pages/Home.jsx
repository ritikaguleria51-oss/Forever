import Homebanner from "../componenets/HomeData/HomeBanner/Homebanner";
import Newproduct from "../componenets/HomeData/NewProducts/Newproduct";
import CollectionSlider from "../componenets/HomeData/CollectionSlider/CollectionSlider";
import Deals from "../componenets/HomeData/DealsSec/Deals";

import products from "../componenets/ProductData";

import "./Home.css";


function Home({ addToCart, wishlist = [], toggleWishlist }) {

  return (
    <div>

      <Homebanner />

      <Newproduct />

      <CollectionSlider
        products={products}
        addToCart={addToCart}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />

      <Deals />

    </div>
  );
}

export default Home;