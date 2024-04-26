import React from "react";
import Navbar from "../componenents/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../states/store";
import { removeFromCart } from "../states/reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../componenents/Footer";

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Calculate grand total price
  const grandTotalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total quantity
  //const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  //Remove product from Cart
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-bold text-3xl mb-4">Your Bag</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{item.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{item.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="bg-gray-200 px-2 py-1 rounded-sm hover:bg-gray-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-right pr-4 font-semibold">
                      Grand Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold">
                        ₹{grandTotalPrice}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              {/* Proceed to Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
