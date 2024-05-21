import Cart from "../models/cart.model.js";
import Product from "../models/products.model.js";

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1,
        });
      }
    }
    await cart.save();
    res
      .status(200)
      .json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res
      .status(200)
      .json({ message: "Product removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

// Increase product quantity in cart
const increaseCartQty = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      item.quantity += 1;
      await cart.save();
      res
        .status(200)
        .json({ message: "Product quantity increased successfully", cart });
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error increasing product quantity in cart:", error);
    res
      .status(500)
      .json({ error: "Failed to increase product quantity in cart" });
  }
};

// Decrease product quantity in cart
const decreaseCartQty = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userId } = req;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        await cart.save();
        res
          .status(200)
          .json({ message: "Product quantity decreased successfully", cart });
      } else {
        res.status(400).json({ error: "Cannot decrease quantity below 1" });
      }
    } else {
      res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error decreasing product quantity in cart:", error);
    res
      .status(500)
      .json({ error: "Failed to decrease product quantity in cart" });
  }
};

// Get user's cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.user._id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error getting user's cart:", error);
    res.status(500).json({ error: "Failed to get user's cart" });
  }
};

export default {
  addToCart,
  removeFromCart,
  increaseCartQty,
  decreaseCartQty,
  getUserCart,
};
