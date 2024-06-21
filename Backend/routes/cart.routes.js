import express from "express";
import Cart from "../models/cart.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

//Route to add product to the cart
router.post("/addToCart", authMiddleware.verifyToken, cartController.addToCart);

//Route to remove product from the cart
router.delete(
  "/removeFromCart",
  authMiddleware.verifyToken,
  cartController.removeFromCart
);

//Route to increase Product qty to the cart
router.post(
  "/increaseCartQty",
  authMiddleware.verifyToken,
  cartController.increaseCartQty
);

//Route to decrease Product qty to the cart
router.post(
  "/decreaseCartQty",
  authMiddleware.verifyToken,
  cartController.decreaseCartQty
);

//Route to get user's cart items
router.get(
  "/userCart/:userId",
  authMiddleware.verifyToken,
  cartController.getUserCart
);

export default router;
