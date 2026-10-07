import womenTop from "../assest/images/fuorpwlcskoaiznjee2q.png";
import menTrousers from "../assest/images/ybrndfjkuwfxdq6tgpk4.png";
import menJacket from "../assest/images/xnmw6lw8zfdwroxh3czv.png";
import womenBlazer from "../assest/images/ps9on9urdrorj7qmf1ub.png";
import menShirt from "../assest/images/g8amsuhdc5soasuhakgd.png";

const products = [
  {
    id: 1,
    name: "Girls Round Neck Cotton Top",
    category: "Clothing",
    type: "Tops",
    description:
      "A lightweight, usually knitted, pullover shirt close-fitting and comfortable.",
    price: 250,
    reviews: 143,
    rating: 4,
    image: womenTop,
    sizes: ["S", "M", "L", "XL"],
  },

  {
    id: 2,
    name: "Men Tapered Fit Flat-Front Trousers",
    category: "Clothing",
    type: "Trousers",
    description:
      "Comfortable and stylish trousers perfect for everyday wear.",
    price: 450,
    reviews: 98,
    rating: 4,
    image: menTrousers,
    sizes: ["M", "L", "XL", "XXL"],
  },

  {
    id: 3,
    name: "Men Zip-Front Relaxed Fit Jacket",
    category: "Clothing",
    type: "Jackets",
    description:
      "A modern relaxed-fit jacket with a clean and simple design.",
    price: 550,
    reviews: 76,
    rating: 4,
    image: menJacket,
    sizes: ["M", "L", "XL"],
  },

  {
    id: 4,
    name: "Women Regular Fit Blazer",
    category: "Clothing",
    type: "Blazers",
    description:
      "Elegant regular-fit blazer suitable for casual and formal looks.",
    price: 650,
    reviews: 121,
    rating: 5,
    image: womenBlazer,
    sizes: ["S", "M", "L", "XL"],
  },

  {
    id: 5,
    name: "Men Slim Fit Casual Shirt",
    category: "Clothing",
    type: "Shirts",
    description:
      "Classic casual shirt with a comfortable slim-fit design.",
    price: 350,
    reviews: 87,
    rating: 4,
    image: menShirt,
    sizes: ["M", "L", "XL"],
  },
];

export default products;