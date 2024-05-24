import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { fetchCart, removeFromCart } from '../states/reducers/cartSlice';
import Navbar from '../componenents/Navbar';
import Footer from '../componenents/Footer';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const fetchStatus = useAppSelector((state) => state.cart.status);
  const fetchError = useAppSelector((state) => state.cart.error);
  
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  
  // const handleRemove = (productId: string) => {
  //   dispatch(removeFromCart({ productId, userId: cart.user }));
  // };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow" style={{ width: '90%', margin: 'auto' }}>
        <div className="max-w-screen-lg mx-auto">
          <h1 className="font-bold text-3xl mb-4">Your Bag</h1>
          {fetchStatus === 'loading' && <p>Loading...</p>}
          {fetchStatus === 'failed' && <p>Error: {fetchError}</p>}
          {cart.items.length === 0 ? (
            <p>Your Bag is empty.</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={`http://localhost:3000/products/Images/${item.image}`} alt={item.name} className="h-12 w-12" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        //onClick={() => handleRemove(item.productId)} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
