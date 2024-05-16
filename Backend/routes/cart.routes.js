import express from "express";
import Cart from "../models/cart.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

//Route to add product to the cart
router.post("/addToCart", authMiddleware.verifyToken, cartController.addToCart);

//Route to get user's cart items
router.get(
  "/userCart/:userId",
  authMiddleware.verifyToken,
  cartController.getUserCart
);

export default router;
