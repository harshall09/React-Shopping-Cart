import React from "react";
import { Link } from "react-router-dom";

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
        <div>
          <p className="text-white font-extrabold">Follow Us:</p>
          <div className="flex items-center">
            <a
              href="#"
              className="text-white font-extrabold mr-4 hover:text-slate-300"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-white font-extrabold mr-4 hover:text-slate-300"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-white font-extrabold mr-4 hover:text-slate-300"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
