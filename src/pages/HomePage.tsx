import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../componenents/Navbar";
import ImageSlider from "../componenents/ImageSlider";
import ProductSlider from "../componenents/ProductSlider";
import PopularProductsData from "../data/products.json";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { addToCart } from "../states/reducers/cartSlice";
import { Product } from "../types";
import Footer from "../componenents/Footer";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items); //Accessing cart state
  const [searchProduct, setSearchProduct] = useState<string>("");
  //State for search product
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value); //update the search query state
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  //Filter popular products based on search product query
  const filteredProducts = PopularProductsData.filter((Product) =>
    Product.name.toLowerCase().includes(searchProduct.toLowerCase())
  );
  // Data for image slider
  const imageSliderImages = ["slider1.jpg", "slider2.jpg", "slider3.jpg"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="container mx-auto py-8 flex-grow"
        style={{ width: "90%", margin: "auto" }}
      >
        <ImageSlider images={imageSliderImages} />
        <div className="mt-8">
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search product by name"
            value={searchProduct}
            onChange={handleSearchInputChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          ></input>
          <ProductSlider
            popularProducts={
              searchProduct ? filteredProducts : PopularProductsData
            }
            onAddToCart={handleAddToCart}
            cart={cart} // Passed the cart state to ProductSlider
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
