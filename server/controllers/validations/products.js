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
    hasSize: Joi.boolean(),
    category: Joi.objectId().required(),
    sizingGroup: Joi.string().valid("women", "men", "kids").required(),
    stock: Joi.alternatives().try(
      Joi.object()
        .keys({
          xs: Joi.number().min(0).required(),
          s: Joi.number().min(0).required(),
          m: Joi.number().min(0).required(),
          l: Joi.number().min(0).required(),
          xl: Joi.number().min(0).required(),
          xxl: Joi.number().min(0).required(),
        })
        .required(),
      Joi.object()
        .keys({
          "8oz": Joi.number().min(0).required(),
          "10oz": Joi.number().min(0).required(),
          "12oz": Joi.number().min(0).required(),
          "14oz": Joi.number().min(0).required(),
          "16oz": Joi.number().min(0).required(),
        })
        .required(),
      Joi.number().min(0).required()
    ),
    sold: Joi.number().min(0),
    shipping: Joi.boolean(),
  });

  return schema.validate(product);
}
