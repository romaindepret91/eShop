import express from "express";
import dotenv from "dotenv";
import connectDB from "./startup/database.js";
import routes from "./startup/routes.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config(); // Access to environment variables
connectDB(); // Connection to database
routes(app); // Call for all app routes

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
