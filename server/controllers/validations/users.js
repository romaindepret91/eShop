import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";
import { passwordSchema } from "./passwordSchema.js";

/**
 * Validate user data when user sign up
 * @param {object} user : user data reveived from client
 * @returns object: values of data received, with error object if error
 */
export function validateCreateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: JoiPasswordComplexity(passwordSchema).required(),
    password_confirmed: Joi.string().valid(Joi.ref("password")).required(),
    firstname: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    address: Joi.string().max(255),
  });
  return schema.validate(user);
}
