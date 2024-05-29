import express from "express";
import wishlistController from "../controllers/wishlist.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Route to add a product to the wishlist
router.post(
  "/wishlist/add",
  authMiddleware.verifyToken,
  wishlistController.addToWishlist
);

// Route to remove a product from the wishlist
router.delete(
  "/wishlist/remove/:productId",
  authMiddleware.verifyToken,
  wishlistController.removeFromWishlist
);

// Route to fetch wishlist items for a user
router.get(
  "/wishlist",
  authMiddleware.verifyToken,
  wishlistController.getWishlistItems
);

export default router;
