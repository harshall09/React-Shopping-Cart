import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../componenents/Navbar";
import ImageSlider from "../componenents/ImageSlider";
import ProductSlider from "../componenents/ProductSlider";
import PopularProductsData from "../data/products.json";
import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";
import { addToCart } from "../states/reducers/cartSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items); //Accessing cart state

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  // Data for image slider
  const imageSliderImages = ["slider1.jpg", "slider2.jpg", "slider3.jpg"];

  return (
    <div>
      <Navbar />
      <div
        className="container mx-auto py-8"
        style={{ width: "90%", margin: "auto" }}
      >
        <ImageSlider images={imageSliderImages} />
        <div className="mt-8">
          <ProductSlider
            popularProducts={PopularProductsData}
            onAddToCart={handleAddToCart}
            cart={cart} // Pass the cart state to ProductSlider
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
