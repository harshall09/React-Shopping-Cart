import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types";


interface ProductListingProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  cart: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({
  products,
  onAddToCart,
  cart,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          cart={cart}
        />
      ))}
    </div>
  );
};

export default ProductListing;
