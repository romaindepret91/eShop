import express from "express";
import dotenv from "dotenv";
import connectDB from "./startup/database.js";
import routes from "./startup/routes.js";
import config from "./startup/config.js";
import dataValidation from "./startup/dataValidation.js";
import { logger } from "./logs/logger.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config(); // Reads environment variables in env file
config(); // Configuration set up
connectDB(); // Connection to database
dataValidation(); // Data validation helpers
routes(app); // Call for all app routes

// Start server
const server = app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = server; // Exports server for testing
