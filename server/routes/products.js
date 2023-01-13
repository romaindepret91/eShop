import express from "express";
const router = express.Router();
import { uploadFiles } from "../middlewares/uploadFiles.js";
// Controller functions
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getOneProduct,
} from "../controllers/products.js";
// Middlewares
import { isUserLoggedIn } from "../middlewares/isUserLoggedIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import catchErrors from "../middlewares/catchErrors.js";

// Create new product
router.post(
  "/products",
  [isUserLoggedIn, isAdmin, uploadFiles],
  catchErrors(createProduct)
);

// Update a product
router.put(
  "/products/:id",
  [isUserLoggedIn, isAdmin, uploadFiles],
  catchErrors(updateProduct)
);

// Delete a product
router.delete(
  "/products/:id",
  [isUserLoggedIn, isAdmin],
  catchErrors(deleteProduct)
);

// Get all products
router.get("/products", catchErrors(getProducts));

// Get one product
router.get("/products/:slug", catchErrors(getOneProduct));

export default router;
