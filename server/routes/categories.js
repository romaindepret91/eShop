import express from "express";
// Controller functions
import { createCategory } from "../controllers/categories.js";
// Middlewares
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.post(
  "/categories",
  [isUserLoggedIn, isAdmin],
  catchErrors(createCategory)
);

export default router;
