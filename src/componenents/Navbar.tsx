import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../states/store";

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <nav style={{ backgroundColor: "#172a3a", color: "white", padding: "1rem" }} className="sm:flex sm:justify-between sm:items-center">
      <div className="container mx-auto flex justify-between items-center ">
        <Link to="/" className="flex items-center">
          <img src="/shopify.png" alt="Logo" className="h-10 mr-2 drop-shadow-xl" />
        </Link>
        <div className="flex items-center">
          <Link
            to="/"
            className="text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/productlisting"
            className="text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            Contact Us
          </Link>
          <Link
            to="/cart"
            className="relative text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs"
                style={{ fontSize: "0.70rem" }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            className="text-white font-bold mr-4 hover:text-gray-300"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
