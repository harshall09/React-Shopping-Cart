import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../states/store";
import { clearUser } from "../states/reducers/userSlice";
import Hamburger from "hamburger-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = Array.isArray(cartItems) ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  const isAuthenticated = useSelector((state: RootState) => state.user.token !== null);
  const user = useSelector((state: RootState) => state.user.user);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear user data from Redux store and local storage
    dispatch(clearUser());
    localStorage.removeItem('token');
  };

  return (
    <nav
      style={{ backgroundColor: "#172a3a", color: "white", padding: "1rem" }}
      className="flex justify-between items-center"
    >
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/shopify.png" alt="Logo" className="h-10 mr-2 drop-shadow-xl" />
        </Link>
        <div className="sm:hidden">
          <Hamburger toggled={isOpen} toggle={handleToggleMenu} />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <div className="hidden sm:flex items-center mr-4">
          <Link to="/" className="text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/productlisting" className="text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
            Products
          </Link>
          <Link to="/about" className="text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
            About Us
          </Link>
          <Link to="/contact" className="text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
            Contact Us
          </Link>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center mr-4">
            <p className="text-white font-bold mr-2">Welcome, {user?.username}</p>
            <button onClick={handleLogout} className="text-white font-bold hover:text-gray-300" style={{ textDecoration: "none" }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/loginpage" className="block text-white font-bold py-2 px-4 hover:bg-gray-800" style={{ textDecoration: "none" }}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        )}
        <Link to="/cart" className="relative text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs" style={{ fontSize: "0.70rem" }}>
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to="/wishlist" className="text-white font-bold mr-4 hover:text-gray-300" style={{ textDecoration: "none" }}>
          <FontAwesomeIcon icon={faHeart} />
        </Link>
      </div>
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 z-10 bg-gray-900 w-48 py-2 mt-3 h-full">
          <Link to="/" className="block text-white font-bold py-2 px-4 hover:bg-gray-800" style={{ textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/productlisting" className="block text-white font-bold py-2 px-4 hover:bg-gray-800" style={{ textDecoration: "none" }}>
            Products
          </Link>
          <Link to="/about" className="block text-white font-bold py-2 px-4 hover:bg-gray-800" style={{ textDecoration: "none" }}>
            About Us
          </Link>
          <Link to="/contact" className="block text-white font-bold py-2 px-4 hover:bg-gray-800" style={{ textDecoration: "none" }}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
