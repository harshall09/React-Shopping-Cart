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
    <nav
      style={{ backgroundColor: "#172a3a", color: "white", padding: "1rem" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/shopify.png"
            alt="Logo"
            className="h-10 mr-2 drop-shadow-xl"
          />
        </Link>
        <div>
          <Link
            to="/"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            to="/productlisting"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Products
          </Link>
          <Link
            to="/about"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Contact Us
          </Link>
          <Link
            to="/cart"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            {cartItemCount > 0 && (
              <span
                style={{
                  marginLeft: "0.5rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "0.875rem",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "9999px",
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>
          {/* Wishlist icon */}
          <Link
            to="/wishlist"
            style={{
              color: "white",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            <FontAwesomeIcon icon={faHeart} className="" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
