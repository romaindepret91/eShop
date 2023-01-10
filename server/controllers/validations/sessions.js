import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";
import { passwordSchema } from "./passwordSchema.js";

/**
 * Validate data received
 * @param {request} req
 * @returns
 */
export function validateCredentials(data) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: JoiPasswordComplexity(passwordSchema).required(),
  });
  return schema.validate(data);
}
