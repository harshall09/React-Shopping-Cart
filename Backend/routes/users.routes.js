import express from "express";
import usersController from "../controllers/users.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for user login
router.post("/login", usersController.loginUser);

// Route to get all users (protected)
router.get("/", authMiddleware.verifyToken, usersController.getAllUsers);

// Route to get all users
router.get("/getAllUsers", usersController.getAllUsers);

// Route to create a new user
router.post("/createUser", usersController.createUser);

// Route to get a user by ID
router.get("/getUser/:userId", usersController.getUserById);

// Route to update a user
router.put("/updateUser/:userId", usersController.updateUser);

// Route to delete a user
router.delete("/deleteUser/:userId", usersController.deleteUser);

// Route to fetch user data based on token
router.get(
  "/fetchUser",
  authMiddleware.verifyToken,
  usersController.fetchUserByToken
);

export default router;
