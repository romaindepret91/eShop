import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

// Password schema
const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 5,
};

/**
 *
 * @param {object} user : user data reveived from client
 * @returns object: values of data received, with error object if error
 */
export function validateCreateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: JoiPasswordComplexity(complexityOptions).required(),
    password_confirmed: Joi.string().valid(Joi.ref("password")).required(),
    firstname: Joi.string().min(2).max(255).required(),
    surname: Joi.string().min(2).max(255).required(),
    address: Joi.string().max(255),
  });
  return schema.validate(user);
}
