// routes/users.routes.js
import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

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

export default router;
