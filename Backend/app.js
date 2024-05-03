import express from "express";
import mongoose from "mongoose";
import { mongoURI } from "./config/mongodb.config.js";

const app = express();
const PORT = process.env.port || 3000;

//connect to MongoDB
mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err.message);
  });

//Middleware
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
