// Models
import Category from "../models/category.js";
// Validation
import { validateCategory } from "./validations/categories.js";
// Npm packages
import mongoose from "mongoose";
import _ from "lodash";
import slugify from "slugify";

/**
 * Create new category in the database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : created category
 */
export const createCategory = async (req, res) => {
  // Data validation
  const validation = validateCategory(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  // Create slug property
  req.body.slug = slugify(req.body.name).toLocaleLowerCase();

  // Check if category slug already taken
  const categoryExists = await Category.findOne({ slug: req.body.slug });
  if (categoryExists)
    return res.status(400).send("Category name already taken");

  // Save category in database
  const category = await new Category(
    _.pick(req.body, ["name", "slug"])
  ).save();

  // Send back created category
  res.json(category);
};

/**
 * Update a category of a given id in database
 * @param {object} req
 * @param {object} res
 */
export const updateCategory = async (req, res) => {
  // Check if id sent is valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid category Id");

  // Data validation
  const validation = validateCategory(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  // Create slug property
  req.body.slug = slugify(req.body.name);

  // Check if category slug already taken
  const categoryExists = await Category.findOne({ slug: req.body.slug });
  if (categoryExists)
    return res.status(400).send("Category name already taken");

  // Check if category with given id exists
  const category = await Category.findByIdAndUpdate(
    id,
    { name: req.body.name, slug: req.body.slug },
    { new: true }
  );
  if (!category)
    return res.status(404).send("Category with given id not found");

  res.json(category);
};

/**
 * Delete a category of a given id in database
 * @param {object} req
 * @param {object} res
 * @returns deleted category
 */
export const deleteCategory = async (req, res) => {
  // Check if id sent is valid
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("Invalid category Id");

  // Check if category exists and delete
  const category = await Category.findByIdAndRemove(id);
  if (!category)
    return res
      .status(404)
      .send("Deletion failed: category with given id not found");

  res.json(category);
};

/**
 * Retrieve all categories from database
 * @param {object} req
 * @param {object} res
 * @returns All categories
 */
export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

/**
 * Retrieve a category of a given id from database
 * @param {object} req
 * @param {object} res
 * @returns errors ? response with relevant error message : category object
 */
export const getOneCategory = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category)
    return res
      .status(404)
      .send(`Category with slug "${req.params.slug}" not found`);
  res.json(category);
};
