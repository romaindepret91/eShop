// Models
import Product from "../models/product.js";
import Category from "../models/category.js";
// Validation
import { validateProduct } from "./validations/products.js";
// Helpers
import { removeProductFiles } from "./helpers/removeProductFiles.js";
// Npm packages
import mongoose from "mongoose";
import slugify from "slugify";

/**
 * Create new product in the database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : created product
 */
export const createProduct = async (req, res) => {
  // Data validation. Remove saved files if error
  const validation = validateProduct(req.body);
  if (validation.error) {
    removeProductFiles(req.files); // Remove saved files from directory
    return res.status(400).send(validation.error.details[0].message);
  }

  // Create slug property
  req.body.slug = slugify(req.body.name).toLocaleLowerCase();

  // Check category exists. Remove files if it does not.]
  const category = await Category.findById(req.body.category);
  if (!category) {
    removeProductFiles(req.files); // Remove saved files from directory
    return res.status(400).send(`"Category" with given id not found`);
  }

  // Save product in database
  const images = req.files.map((file) => file.path); // Extract files paths
  // Merge all properties
  const product = await new Product(
    Object.assign(
      _.pick(req.body, [
        "name",
        "slug",
        "brand",
        "description",
        "price",
        "category",
        "stock",
      ]),
      { images: images }
    )
  ).save();
  res.json(product);
};

/**
 * Update a product of a given id in database
 * @param {object} req
 * @param {object} res
 */
export const updateProduct = async (req, res) => {};

/**
 * Delete a product of a given id in database
 * @param {object} req
 * @param {object} res
 * @returns deleted product
 */
export const deleteProduct = async (req, res) => {};

/**
 * Retrieve all products from database
 * @param {object} req
 * @param {object} res
 * @returns All products
 */
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

/**
 * Retrieve a product of a given id from database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : product object
 */
export const getOneProduct = async (req, res) => {};
