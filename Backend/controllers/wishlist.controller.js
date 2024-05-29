import Wishlist from "../models/wishlist.model.js";
import Product from "../models/products.model.js";

console.log("Wishlist model", Wishlist);
console.log("Product model", Product);
// Controller method to add a product to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();
    res.status(201).json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    await Wishlist.findOneAndDelete({ userId, productId });
    res.json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to fetch wishlist items for a user
const getWishlistItems = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      console.log("userId is missing");
      return res.status(400).json({ error: "userId is required" });
    }

    console.log("Fetching wishlist items for userId:", userId);

    const wishlistItems = await Wishlist.find({ userId }).populate({
      path: "productId",
      select: "name description image price categoryName",
    });
    console.log("Wishlist items:", wishlistItems);

    const products = wishlistItems.map((item) => item.productId);
    console.log("Products:", products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  addToWishlist,
  removeFromWishlist,
  getWishlistItems,
};
