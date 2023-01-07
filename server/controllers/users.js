import User from "../models/user.js";
import { validateUserCreate } from "./validations/users.js";
import _ from "lodash";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  // Data validation
  const validation = validateUserCreate(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  // Check if email sent is already used
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This email is already used");

  // Instantiate user: select only the required properties to prevent malicious insertions
  user = await new User(
    _.pick(req.body, [
      "username",
      "email",
      "password",
      "firstname",
      "surname",
      "address",
      "isAdmin",
    ])
  );

  // Hash password
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);

  // Save user in DB
  await user.save();

  // Send response with selected user properties (no password)
  console.log(user);
  res.json(
    _.pick(user, [
      "username",
      "email",
      "firstname",
      "surname",
      "address",
      "isAdmin",
    ])
  );
};
