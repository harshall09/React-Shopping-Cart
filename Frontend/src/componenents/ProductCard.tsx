import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../states/reducers/cartSlice";
import { RootState } from "../states/store";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart({ userId: "user_id", productId: product.id }));
    alert("Product added to cart");
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
          <h2 className="text-md font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <p className="text-lg font-semibold text-blue-600">₹{product.price}</p>
        {cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
              onClick={() => {}}
            >
              -
            </button>
            <span>{cartItem.quantity}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2 hover:bg-blue-600"
              onClick={() => {}}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart()}
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
