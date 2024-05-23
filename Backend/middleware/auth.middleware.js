import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/users.model.js";

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET); // Adding to check the secret key

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Authorization token missing or malformed");
      return res
        .status(401)
        .json({ error: "Authorization token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received Token:", token); // Logging the token

    if (!token) {
      console.log("Token not provided");
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Log the decoded token

    req.userId = decoded.userId; // Set userId in the request object
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default {
  verifyToken,
  comparePassword,
};
