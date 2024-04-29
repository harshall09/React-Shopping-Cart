import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types";

interface ProductSliderProps {
  popularProducts: Product[];
  onAddToCart: (product: Product) => void;
  cart: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  popularProducts,
  onAddToCart,
  cart,
}) => {
  return (
    <div className="mb-8">
    <h2 className="text-2xl font-semibold m-4">Popular Products</h2>
    <div className="flex flex-wrap">
      {popularProducts.map((product) => (
        <div key={product.id} className="mx-4 my-4">
          <ProductCard product={product} onAddToCart={onAddToCart} cart={cart} />
        </div>
      ))}
    </div>
  </div>
  );
};

export default ProductSlider;
