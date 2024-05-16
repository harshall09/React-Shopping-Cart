// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; //for password hashing
import User from "../models/users.model.js";
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.userId = decoded.userId;
    next();
  });
};
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default {
  verifyToken,
  comparePassword,
};
