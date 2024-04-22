import React from "react";
import Navbar from "../componenents/Navbar";

const CheckoutPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="font-bold text-3xl mb-4">Checkout</h1>
        <form className="mx-auto max-w-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2" htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="block px-4 py-2 mt-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2" htmlFor="lastName">
                Last Name:
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="block px-4 py-2 mt-1 border rounded-md w-full"
                />
              </label>
            </div>
          </div>
          {/* Add more fields here */}
          <div className="mb-4">
            <label className="block mb-2" htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="address">
              Address:
              <textarea
                id="address"
                name="address"
                rows={4}
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="city">
              City:
              <input
                type="text"
                id="city"
                name="city"
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="zip">
              ZIP Code:
              <input
                type="text"
                id="zip"
                name="zip"
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="country">
              Country:
              <input
                type="text"
                id="country"
                name="country"
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          {/* Card details */}
          <h2 className="text-xl font-semibold mb-2">Card Details</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="cardNumber">
              Card Number:
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="block px-4 py-2 mt-1 border rounded-md w-full"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2" htmlFor="expiryDate">
                Expiry Date:
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="block px-4 py-2 mt-1 border rounded-md w-full"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2" htmlFor="cvv">
                CVV:
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="block px-4 py-2 mt-1 border rounded-md w-full"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
