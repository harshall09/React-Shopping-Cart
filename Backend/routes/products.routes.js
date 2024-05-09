import express from "express";
import productsController from "../controllers/products.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = express.Router();

// Route to get all products
router.get("/getallproducts", productsController.getAllProducts);

// Route to get a product by ID
router.get("/getproduct/:id", productsController.getProductById);

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
