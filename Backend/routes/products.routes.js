import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import productsController from "../controllers/products.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Serve images statically
// Serve uploaded images statically
const __dirname = path.dirname(new URL(import.meta.url).pathname);
router.use("/images", express.static(path.join(__dirname, "../Images")));

// Route to get all products
router.get("/getallproducts", productsController.getAllProducts);

// Route to get a product by ID
router.get("/getproduct/:id", productsController.getProductById);

// Route to fetch products by category name
router.get(
  "/getproductsbycategory/:categoryName",
  productsController.getProductsByCategory
);

// Route to create a new product
router.post(
  "/createproduct",
  upload.single("image"), // Make sure this middleware is before the controller function
  productsController.createProduct
);

// Route to update a product by ID
router.put("/updateproduct/:id", productsController.updateProduct);

// Route to delete a product by ID
router.delete("/deleteproduct/:id", productsController.deleteProduct);

export default router;
