// app.js
import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

const app = express();

// Enable CORS
app.use(cors());
app.options("*", cors());

// Serve static files
app.use(express.static("/Images"));

// Parse JSON request body
app.use(express.json());

// Mount routes
app.use("/v1", routes);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/api", wishlistRoutes);

export default app;
