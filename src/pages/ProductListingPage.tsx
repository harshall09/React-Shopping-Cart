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
      selectedCategory === categoryName ? null : categoryName
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

  // Get products based on selected category or all products if no category is selected
  const displayProducts: Product[] = selectedCategory
    ? categoryProducts[selectedCategory]
    : Object.values(categoryProducts).flat();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="px-4 py-2 flex justify-center space-x-4 flex-wrap">
        <span className="mx-3 ml-5 font-medium"> Categories: </span>
        {Object.keys(categoryProducts).map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => handleCategoryChange(categoryName)}
            className={`w-fit min-w-fit h-8 px-5 py-2 flex items-center text-sm border rounded-3xl cursor-pointer transition-all duration-300 ${
              selectedCategory === categoryName
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-500 bg-white text-gray-900 hover:bg-gray-200"
            } sm:mr-2 sm:mb-2 mb-2`}
          >
            {categoryName}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)} // Reset selected category to display all products
          className={`w-fit min-w-fit h-8 px-5 py-2 flex items-center text-sm border rounded-3xl cursor-pointer transition-all duration-300${
            selectedCategory === null
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-500 bg-white text-gray-900 hover:bg-gray-200"
          } sm:mb-2 mb-2`}
        >
          All
        </button>
      </div>
      <div
        className="flex items-center mt-8 flex-grow mx-4 my-4"
        style={{ width: "90%", margin: "auto" }}
      >
        <div className="flex flex-wrap  justify-center sm:justify-start">
          {displayProducts.map((product) => (
            <div key={product.id} className="mx-4 my-4">
              <ProductCard product={product} cart={[]} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;
