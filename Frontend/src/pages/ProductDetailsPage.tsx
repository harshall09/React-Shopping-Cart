import React, { useState, useEffect } from "react";
import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";
import productsData from "../data/products.json";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import { useDispatch } from "react-redux";
import { addToCart } from "../states/reducers/cartSlice";
import { addToWishlist } from "../states/reducers/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ProductDetailsPage: React.FC = () => {
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const dispatch = useDispatch();

  useEffect(() => {
    // Find the product with the matching ID from the products data
    const selectedProduct = productsData
      .flatMap((category) => category.products)
      .find((product) => product.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      console.error(`Product with ID ${id} not found`);
    }
  }, [id]);

  const handleFavoriteClick = () => {
    if (product) {
      dispatch(addToWishlist(product)); // Dispatch the addToWishlist action with the selected product
      alert("Product added to wishlist");
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch the addToCart action with the selected product
      alert("Product added to cart!"); // Show an alert or any other UI feedback
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg mb-4 max-w-xs"
            />
          </div>
          {/* // Product Information */}
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-3xl font-semibold mb-4 text-center md:text-left">
              {product.name}
            </h1>
            <p className="text-lg mb-4 text-center md:text-left">
              Price: ₹{product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-4 text-center md:text-left">
              {product.description}
            </p>
            <div className="flex items-center justify-center md:justify-start mt-4">
              <button
                className="bg-blue-500 text-white px-5 py-3 rounded-md mr-3 hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <FontAwesomeIcon
                icon={isFavorite ? faHeart : faHeartOutline}
                className={`cursor-pointer text-2xl ${
                  isFavorite ? "text-red-500" : ""
                }`}
                onClick={handleFavoriteClick}
              />
            </div>
          </div>
        </div>

        {/* Tab buttons and content */}
        <div className="container mx-auto">
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handleTabChange("description")}
              className={`bg-gray-200 text-gray-800 text-xl px-4 py-2 rounded-l-md ${
                activeTab === "description" ? "bg-gray-400 text-black" : ""
              }`}
            >
              Description
            </button>
            <button
              onClick={() => handleTabChange("specifications")}
              className={`bg-gray-200 text-gray-800 text-xl px-4 py-2 rounded-r-md ${
                activeTab === "specifications" ? "bg-gray-400 text-black" : ""
              }`}
            >
              Specifications
            </button>
          </div>

          {/* Tab content */}
          <div className="mt-4 flex justify-center">
            {activeTab === "description" && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            {activeTab === "specifications" && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                <ul>
                  <li className="text-gray-700">Color:</li>
                  <li className="text-gray-700">Size:</li>
                  <li className="text-gray-700">Weight:</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;