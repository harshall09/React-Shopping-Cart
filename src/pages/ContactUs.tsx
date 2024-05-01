// ContactUsPage.tsx
import React from "react";
import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";

const ContactUsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-screen-lg mx-auto" style={{ width: "90%", margin: "auto" }}>
          <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">
            You can reach out to us through the following channels:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li className="mb-2">
              Phone: <a href="tel:+123456789">+123456789</a>
            </li>
            <li className="mb-2">
              Email: <a href="mailto:info@example.com">info@example.com</a>
            </li>
            <li>
              Address: 123 Main Street, CG Road, Ahmedabad, India - 12345
            </li>
          </ul>
          <p className="text-lg">
            Our team is available to assist you with any inquiries or support
            you may need. Don't hesitate to get in touch!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
