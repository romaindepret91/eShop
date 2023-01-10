import Joi from "joi";

/**
 * Validate category data when create new category
 * @param {object} category : category data reveived from client
 * @returns object: values of data received, with error object if error
 */
export function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(32).required(),
    slug: Joi.string().lowercase(),
  });

  return schema.validate(category);
}
