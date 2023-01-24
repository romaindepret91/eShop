import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
dotenv.config();

/**
 *  Allow access to route if auth token is provided
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns
 */
export async function isUserLoggedIn(req, res, next) {
  const authToken = req.header("authToken");
  if (!authToken)
    return res.status(401).send("Access denied. No token provided");

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_PRIVATEKEY);
    req.user = decodedToken;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Invalid user");
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}
