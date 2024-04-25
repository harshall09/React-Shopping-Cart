import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons from React Icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-500 text-black p-4 mt-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <p className="text-white font-extrabold mr-4">&copy; 2024 Shopping Cart</p>
          <Link
            to="/privacy-policy"
            className="text-white font-extrabold mr-4 hover:text-slate-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="text-white font-extrabold mr-4 hover:text-slate-300"
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex">
          <p className="text-white font-extrabold mr-2">Follow Us:  </p>
          <div className="flex items-center">
            <a href="#" className="text-white font-extrabold mr-4 hover:text-slate-300">
              <FaFacebook />
            </a>
            <a href="#" className="text-white font-extrabold mr-4 hover:text-slate-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-white font-extrabold mr-4 hover:text-slate-300">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
