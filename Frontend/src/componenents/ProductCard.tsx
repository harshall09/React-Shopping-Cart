import React from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { addToCart } from '../states/reducers/cartSlice';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    try {
      console.log('Dispatching addToCart action for product:', product._id);
      await dispatch(addToCart({ productId: product._id, userId: user.user }));
      console.log('Product added to cart:', product);
      alert('Product added to cart');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart');
    }
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
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
