import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const Navbar: React.FC = () => {
  const cartItemCount = useSelector(
    (state: RootState) => state.cart.items.length
  );
  return (
    <nav className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/shopify.png" alt="Logo" className="h-10 mr-2" />
        </Link>
        <div>
          <Link
            to="/"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            Contact Us
          </Link>
          <Link
            to="/cart"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span className="ml-1 bg-blue-500 text-sm text-white rounded-full px-2">
                {cartItemCount}
              </span>
            )}
          </Link>
          {/* Wishlist icon */}
          <Link
            to="/wishlist"
            className="text-white font-bold mr-4 hover:text-gray-200"
          >
            <FontAwesomeIcon icon={faHeart} className="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
