import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { fetchCart, removeFromCart } from '../states/reducers/cartSlice';
import Navbar from '../componenents/Navbar';
import Footer from '../componenents/Footer';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    console.log("fetchcart");
    
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  // Ensure cart is an array
  const cartItems: CartItem[] = Array.isArray(cart) ? cart : [];

  const grandTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow" style={{ width: '90%', margin: 'auto' }}>
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-bold text-3xl mb-4">Your Bag</h1>
          {cartItems.length === 0 ? (
            <p>Your Bag is empty.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 mb-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Price</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.productId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{item.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={item.image} alt={item.name} className="h-16 w-16" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{item.price * item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemoveFromCart(item.productId)}
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
                      <td colSpan={4} className="text-right pr-4 font-semibold">Grand Total:</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold">₹{grandTotalPrice}</div>
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
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
