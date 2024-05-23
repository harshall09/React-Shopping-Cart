import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { fetchCart } from '../states/reducers/cartSlice';
import Navbar from '../componenents/Navbar';
import Footer from '../componenents/Footer';
import { CartItem } from '../../types';

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const fetchStatus = useAppSelector((state) => state.cart.status);
  const fetchError = useAppSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (fetchStatus === 'failed') {
      console.error('Failed to fetch cart:', fetchError);
    }
  }, [fetchStatus, fetchError]);

  const cartItems: CartItem[] = Array.isArray(cart) ? cart : [];

  const grandTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
                  {/* Table header */}
                  {/* Table body */}
                  {/* Table footer */}
                </table>
              </div>
              {/* Proceed to checkout button */}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
