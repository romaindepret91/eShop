// Models
import Product from "../models/product.js";
import Category from "../models/category.js";
// Validation
import { validateProduct } from "./validations/products.js";
// Helpers
import { removeProductFiles } from "./helpers/removeProductFiles.js";
import { handleUpdateProductFiles } from "./helpers/handleUpdateProductFiles.js";
// Npm packages
import mongoose from "mongoose";
import slugify from "slugify";
import _ from "lodash";
import fs from "fs";

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

  // Check category exists. Remove files if it does not
  const category = await Category.findById(req.body.category);
  if (!category) {
    removeProductFiles(req.files, true); // Remove saved files from directory
    return res.status(400).send(`"Category" with given id not found`);
  }

  // Merge all properties and save in database
  let product = await new Product(
    _.pick(req.body, [
      "name",
      "slug",
      "brand",
      "description",
      "price",
      "category",
      "stock",
    ])
  ).save();

  // Handle files saving
  const images = handleUpdateProductFiles(req.files, product, true);

  // Update images property of product
  product = await Product.findByIdAndUpdate(
    product._id,
    {
      images: images,
    },
    { new: true }
  );

  res.json(product);
};

/**
 * Update a product of a given id in database
 * @param {object} req
 * @param {object} res
 */
export const updateProduct = async (req, res) => {
  // Check if product id is received and valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid product id format"); // check if valid

  // Data validation. Remove saved files if error
  const validation = validateProduct(req.body);
  if (validation.error) {
    removeProductFiles(req.files, true); // Remove saved files from directory
    return res.status(400).send(validation.error.details[0].message);
  }

  // Create slug property
  req.body.slug = slugify(req.body.name).toLocaleLowerCase();

  // Check category exists. Remove files if it does not
  const category = await Category.findById(req.body.category);
  if (!category) {
    removeProductFiles(req.files, true); // Remove saved files from directory
    return res.status(400).send(`"Category" with given id not found`);
  }

  // Check if product with given id exists in database and update
  let product = await Product.findByIdAndUpdate(
    id,
    Object.assign(
      _.pick(req.body, [
        "name",
        "slug",
        "brand",
        "description",
        "price",
        "category",
        "stock",
      ])
    ),
    { new: true }
  );
  if (!product) {
    return res.status(404).send("Product with given id not found");
  }
  if (!_.isEmpty(req.files)) {
    const images = handleUpdateProductFiles(req.files, product, false);

    product = await Product.findByIdAndUpdate(
      id,
      {
        images: images,
      },
      { new: true }
    );
  }

  res.json(product);
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
    return res.status(400).send("Invalid product id format");

  // Check if product exists and delete
  const product = await Product.findByIdAndDelete(id);
  if (!product) return res.status(404).send("Product with given id not found");

  // Remove files from server
  removeProductFiles(product.images, false);
  res.send(product);
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @returns
 */
export const deleteProductImage = async (req, res) => {
  // Check if product id is valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid product id format");

  // Check if product with given id exists in database
  let product = await Product.findById(id);
  if (!product) return res.status(404).send("Product with given id not found");

  // Check if product image exists
  const imageId = req.params.imageId;
  if (!imageId) return res.status(400).send("Image id must be provided");

  // Delete image file from server and delete image object from images property
  const images = product.images.filter((image) => {
    if (fs.existsSync(image[imageId])) fs.unlinkSync(image[imageId]);
    return !(imageId in image);
  });

  // Reorder indexes and images path
  images.forEach((image, index) => {
    const oldImageKey = Object.keys(image).toString();
    let imagePath = image[oldImageKey];
    // Replace image numbers in path with ordered numbers
    imagePath = imagePath.replace(
      imagePath.substring(imagePath.indexOf("."), imagePath.indexOf(".") - 6),
      `image${index + 1}`
    );
    // Update Key
    const newKey = `image${index + 1}`;
    // Create new image objet
    image[newKey] = imagePath;
    // Rename file in public directory
    fs.renameSync(image[oldImageKey], imagePath);
    // Delete old image object
    delete image[oldImageKey];
  });

  product = await Product.findByIdAndUpdate(
    id,
    {
      images: images,
    },
    { new: true }
  );

  res.json(product);
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
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid product id format"); // check if valid

  // Check if product with given id exists in database
  const product = await Product.findById(id).populate("category");
  if (!product) return res.status(404).send("Product with given id not found");

  // Check if product slug received matches slug in database
  if (product.slug !== req.params.slug)
    return res.status(400).send("Product slug does not match records");

  res.json(product);
};
