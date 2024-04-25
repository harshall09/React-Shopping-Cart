import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons from React Icons

const Footer: React.FC = () => {
  return (
    <footer
      style={{ backgroundColor: "#e6e6e6", color: "#333", padding: "1rem" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <p style={{ color: "#333", fontWeight: "bold", marginRight: "1rem" }}>
            &copy; 2024 Shopping Cart
          </p>
          <Link
            to="/privacy-policy"
            style={{
              color: "#333",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            style={{
              color: "#333",
              fontWeight: "bold",
              marginRight: "1rem",
              textDecoration: "none",
            }}
          >
            Terms of Service
          </Link>
        </div>
        <div className="flex">
          <p style={{ color: "#333", fontWeight: "bold", marginRight: "1rem" }}>
            Follow Us:{" "}
          </p>
          <div className="flex items-center">
            <a
              href="#"
              style={{
                color: "#333",
                fontWeight: "bold",
                marginRight: "1rem",
                textDecoration: "none",
              }}
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              style={{
                color: "#333",
                fontWeight: "bold",
                marginRight: "1rem",
                textDecoration: "none",
              }}
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              style={{
                color: "#333",
                fontWeight: "bold",
                marginRight: "1rem",
                textDecoration: "none",
              }}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
