import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../states/reducers/cartSlice";
import { RootState } from "../states/store";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void; // Make onAddToCart optional
  cart: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItem = cart.find((item) => item.id === product.id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(increaseQuantity(product.id));
    }
  };

  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(decreaseQuantity(product.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-64">
      <Link to={`/product/${product.id}`} className="cursor-pointer block">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </Link>
      <div className="flex justify-between items-center p-4">
        <p className="text-lg font-semibold text-blue-600">₹{product.price}</p>
        {cartItem ? (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
              onClick={handleDecrement}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-blue-600"
              onClick={handleIncrement}
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
