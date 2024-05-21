// src/pages/Homepage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../componenents/Navbar";
import Footer from "../componenents/Footer";
import ImageSlider from "../componenents/ImageSlider";
import ProductSlider from "../componenents/ProductSlider";
import { useAppDispatch, useAppSelector } from "../states/hooks";
import { Product } from "../../types";

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3000/products/getallproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const imageSliderImages = ["slider1.jpg", "slider2.jpg", "slider3.jpg"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8 flex-grow" style={{ width: "90%", margin: "auto" }}>
        <ImageSlider images={imageSliderImages} />
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search product by name"
            value={searchProduct}
            onChange={handleSearchInputChange}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <ProductSlider popularProducts={searchProduct ? filteredProducts : products} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
