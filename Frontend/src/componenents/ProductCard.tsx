import React from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { addToCart, removeFromCart } from '../states/reducers/cartSlice';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user.user);
  const cartItem = Array.isArray(cart) ? cart.find((item) => item.productId === product._id) : null;

  const handleAddToCart = () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }
    dispatch(addToCart({ productId: product._id, userId: user._id }));
    console.log('Product added to cart:', product);
    alert('Product added to cart');
  };

  const handleRemoveFromCart = () => {
    if (!user) {
      alert('Please log in to remove items from your cart.');
      return;
    }
    dispatch(removeFromCart(product._id));
    console.log('Product removed from cart:', product);
    alert('Product removed from cart');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64">
      <div className="cursor-pointer block">
        <img
          src={`http://localhost:3000/products/Images/${product.image}`}
          alt={product.name}
          className="h-64 w-full object-cover hover:scale-110"
        />
        <div className="p-4">
          <h2 className="text-md font-semibold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <p className="text-lg font-semibold text-blue-600">₹{product.price}</p>
        {cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
              onClick={handleRemoveFromCart}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-blue-600"
              onClick={handleAddToCart}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
