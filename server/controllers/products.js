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
import _ from "lodash";

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
    removeProductFiles(req.files, true); // Remove saved files from directory
    return res.status(400).send(validation.error.details[0].message);
  }

  // Create slug property
  req.body.slug = slugify(req.body.name).toLocaleLowerCase();

  // Check category exists. Remove files if it does not.]
  const category = await Category.findById(req.body.category);
  if (!category) {
    removeProductFiles(req.files, true); // Remove saved files from directory
    return res.status(400).send(`"Category" with given id not found`);
  }

  // Save product in database
  const images = [];
  for (let image in req.files) {
    const imageObject = req.files[image][0];
    // Extract file path and name
    const imageKey = imageObject["fieldname"];
    const imageValue = imageObject["path"];
    const newImageObject = { [imageKey]: imageValue };
    images.push(newImageObject);
  }

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
export const updateProduct = async (req, res) => {
  res.send("update product");
};

/**
 * Delete a product of a given id in database
 * @param {object} req
 * @param {object} res
 * @returns deleted product
 */
export const deleteProduct = async (req, res) => {
  // Check if product id is valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid product id format"); // check if valid

  // Check if product exists and delete
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).send("Product with given id not found");

  // Remove files from server
  removeProductFiles(product.images, false);
  res.send(product);
};

/**
 * Retrieve all products from database
 * @param {object} req
 * @param {object} res
 * @returns All products
 */
export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category")
    .sort({ createdAt: -1 });
  res.json(products);
};

/**
 * Retrieve a product of a given id from database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : product object
 */
export const getOneProduct = async (req, res) => {
  // Check if product id is received and valid
  const id = req.query.id;
  if (!id) return res.status(400).send("Id product must be provided"); // check if received
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid product id format"); // check if valid

  // Check if produtc with given id exists in database
  const product = await Product.findById(id).populate("category");
  if (!product) return res.status(404).send("Product with given id not found");

  // Check if product slug received matches slug in database
  if (product.slug !== req.params.slug)
    return res.status(400).send("Product slug does not match records");

  res.json(product);
};
