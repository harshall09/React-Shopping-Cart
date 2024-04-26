import React, { useState } from "react";
import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";
import productsData from "../data/products.json";
import { Product } from "../types";
import ProductCard from "../componenents/ProductCard";

interface CategoryProducts {
  [key: string]: Product[];
}

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
  };
  
  // Convert productsData to the appropriate format
  const categoryProducts: CategoryProducts = productsData.reduce(
    (acc: CategoryProducts, current) => {
      acc[current.category] = current.products;
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="px-4 py-2 flex justify-center space-x-4">
        <span className="mx-3 ml-5 font-medium"> Categories: </span>
        {Object.keys(categoryProducts).map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => handleCategoryChange(categoryName)}
            className={`w-fit min-w-fit h-8 px-5 py-2 flex items-center text-sm border rounded-3xl cursor-pointer transition-all duration-300 ${
              selectedCategory === categoryName
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-500 bg-white text-gray-900 hover:bg-gray-200"
            }`}
          >
            {categoryName}
          </button>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 flex-grow">
        {!selectedCategory && <p>Please select a category to view products.</p>}
        {selectedCategory && (
          <div className="flex flex-wrap justify-center">
            {categoryProducts[selectedCategory].map((product) => (
              <ProductCard key={product.id} product={product} cart={[]} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;
