// Models
import Category from "../models/category.js";
// Validation
import { validateCreateCategory } from "./validations/categories.js";
// Npm packages
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
  const validation = validateCreateCategory(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  // Create slug property
  req.body.slug = slugify(req.body.name);

  // Check if category already exists
  const categoryExists = await Category.findOne({ slug: req.body.slug });
  if (categoryExists) return res.status(400).send("Category already exists");

  // Save category in database
  const category = await new Category(
    _.pick(req.body, ["name", "slug"])
  ).save();

  // Send back created category
  res.json(category);
};
