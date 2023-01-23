import express from "express";
// Controller functions
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getOneCategory,
} from "../controllers/categories.js";
// Middlewares
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

// Get all categories
router.get(
  "/categories",
  [isUserLoggedIn, isAdmin],
  catchErrors(getCategories)
);

// Get one category
router.get(
  "/categories/:slug",
  [isUserLoggedIn, isAdmin],
  catchErrors(getOneCategory)
);

// Create new category
router.post(
  "/categories",
  [isUserLoggedIn, isAdmin],
  catchErrors(createCategory)
);

// Update a category
router.put(
  "/categories/:id",
  [isUserLoggedIn, isAdmin],
  catchErrors(updateCategory)
);

// Delete a category
router.delete(
  "/categories/:id",
  [isUserLoggedIn, isAdmin],
  catchErrors(deleteCategory)
);

export default router;
