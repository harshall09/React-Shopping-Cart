// index.js
import express from "express";
const router = express.Router();

// Define your routes here
router.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// Handle 404 errors
router.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

export default router;
