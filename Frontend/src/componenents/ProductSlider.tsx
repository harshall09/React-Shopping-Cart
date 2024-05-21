import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../types";

interface ProductSliderProps {
  popularProducts: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ popularProducts }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold m-4">Popular Products</h2>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {popularProducts.map((product) => (
          <div key={product._id} className="mx-4 my-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
