// Models
import User from "../models/user.js";
// Validation
import { validateCredentials } from "./validations/sessions.js";
// Npm packages
import bcrypt from "bcrypt";
import _ from "lodash";

/**
 * AUTHENTICATE USER: Start a new session when user log in
 * @param {object} req
 * @param {object} res
 */
export const startSession = async (req, res) => {
  // Data validation
  const validation = validateCredentials(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  // Check if email sent exists in db
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  // Check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // Generate web token
  const authToken = user.generateAuthToken();

  // Send response with selected user properties (no password)
  res.json({
    user: _.pick(user, [
      "username",
      "email",
      "firstname",
      "surname",
      "address",
      "isAdmin",
    ]),
    authToken: authToken,
  });
};
