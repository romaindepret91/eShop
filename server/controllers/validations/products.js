import Joi from "joi";

/**
 * Validate product data when create new product
 * @param {object} product : product data reveived from client
 * @returns object: values of data received, with error object if error
 */
export function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(32).required(),
    slug: Joi.string().lowercase(),
    brand: Joi.string().min(2).max(32).required(),
    description: Joi.string().min(2).max(2000).required(),
    price: Joi.number().min(0.01).required(),
    category: Joi.objectId().required(),
    stock: Joi.number().min(1).required(),
    sold: Joi.number().min(0),
    images: Joi.any().description("Image Fil"),
    shipping: Joi.boolean(),
  });

  return schema.validate(product);
}

export function validateImagesProduct(images) {
  const schema = Joi.object({
    images: Joi.binary(),
  });

  return schema.validate(images);
}
