// Models
import Product from "../models/product.js";
// Validation
import {
  validateProduct,
  validateImagesProduct,
} from "./validations/products.js";
// Npm packages
import mongoose from "mongoose";
import _ from "lodash";
import slugify from "slugify";

/**
 * Create new product in the database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : created product
 */
export const createProduct = async (req, res) => {
  console.log("Product created");
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
export const getProducts = async (req, res) => {};

/**
 * Retrieve a product of a given id from database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : product object
 */
export const getOneProduct = async (req, res) => {};
