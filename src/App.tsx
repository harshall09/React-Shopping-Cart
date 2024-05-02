import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/About";
import ContactUsPage from "./pages/ContactUs";
import WishlistPage from "./pages/Wishlist";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductListingPage from "./pages/ProductListingPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  // const cart: Product[] = [];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/productlisting" element={<ProductListingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
