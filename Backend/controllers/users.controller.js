import User from "../models/users.model.js";
import authMiddleware from "../middleware/auth.middleware.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const { comparePassword } = authMiddleware;

// Controller method for user registration and creation
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate request body
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Respond with the created user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error (e.g., unique constraint on username or email)
      res.status(400).json({ error: "Username or email already exists" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Controller method for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and if password is correct
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords from response
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to get a user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password"); // Exclude password from response

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    // Prepare the update data
    const updatedData = { username, email };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true, // Ensure validation rules are applied
    }).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method to delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId).select(
      "-password"
    ); // Exclude password from response

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
