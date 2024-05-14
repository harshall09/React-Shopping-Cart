import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  categoryName: { type: String, required: true },
});

const Product = mongoose.model("Products", productSchema);
export default Product;
