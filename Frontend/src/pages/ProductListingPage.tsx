import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../componenents/ProductCard";
import { Product } from "../../types";

const ProductListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category names
        const categoryResponse = await axios.get<string[]>(
          "http://localhost:3000/products/getcategorynames"
        );
        setCategoryNames(categoryResponse.data);

        // Fetch all products initially
        const productResponse = await axios.get<Product[]>(
          "http://localhost:3000/products/getallproducts"
        );
        setProducts(productResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (categoryName: string | null) => {
    setLoading(true); // Set loading to true when fetching new products
    try {
      let url = "http://localhost:3000/products/getallproducts";
      if (categoryName !== null) {
        url = `http://localhost:3000/products/getProductsByCategory/${categoryName}`;
      }
      const response = await axios.get<Product[]>(url);
      setProducts(response.data); // Update products based on the selected category or all products if "All" is clicked
      setSelectedCategory(categoryName); // Update the selected category
    } catch (error) {
      console.error("Error fetching Products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching products
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="px-4 py-2 flex justify-center space-x-4 flex-wrap">
        <span className="mx-3 ml-5 font-medium">Categories:</span>
        {categoryNames.map((categoryName) => (
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
          onClick={() => handleCategoryChange(null)} // Handle click on "All" button
          className={`w-fit min-w-fit h-8 px-5 py-2 flex items-center text-sm border rounded-3xl cursor-pointer transition-all duration-300 ${
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
        <div className="flex flex-wrap justify-center sm:justify-start">
          {loading ? (
            <div>Loading...</div>
          ) : products.length === 0 ? (
            <div>No products found</div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="mx-4 my-4">
                <ProductCard product={product} cart={[]} />
              </div>
            ))
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProductListingPage;
