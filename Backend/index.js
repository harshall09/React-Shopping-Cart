// index.js
import app from "./app.js";
import { mongoose } from "./config/mongodb.config.js";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
