import React, { useState, useEffect } from "react";
import Navbar from "../componenents/Navbar";
import productsData from "../data/products.json";
import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { useDispatch } from "react-redux";
//import { RootState } from "../states/store.tsx";
import { addToCart } from "../states/reducers/cartSlice.tsx";
import { addToWishlist } from "../states/reducers/wishlistSlice.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const ProductDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  //const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    // Find the product with the matching ID from the products data
    const selectedProduct = productsData.find(
      (product) => product.id === parseInt(id)
    );
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
  const handleBack = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch the addToCart action with the selected product
      alert("Product added to cart!"); // Show an alert or any other UI feedback
    }
  };

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Back button and Product Image */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 hover:bg-blue-600"
            >
              Back to Home
            </button>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg mt-4"
            />
          </div>

          {/* Right side: Product Information */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
            <p className="text-lg mb-4">Price: ₹{product.price.toFixed(2)}</p>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center mt-4">
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
      </div>
    </>
  );
};

export default ProductDetailsPage;
