import Cart from "../models/cart.model.js";

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    // Check if the product already exists in the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If the user doesn't have a cart, create a new one
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId }],
      });
      await newCart.save();
    } else {
      // If the user already has a cart, update it with the new product
      const existingItem = cart.items.find((item) => item.product == productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId });
      }
      await cart.save();
    }
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get user's cart items
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching user's cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default {
  addToCart,
  getUserCart,
};
