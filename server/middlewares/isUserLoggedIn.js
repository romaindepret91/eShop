import jwt from "jsonwebtoken";
import config from "config";

/**
 *  Allow access to route if auth token is provided
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns
 */
export function isUserLoggedIn(req, res, next) {
  const authToken = req.header("authToken");
  if (!authToken)
    return res.status(401).send("Access denied. No token provided");

  try {
    const decodedToken = jwt.verify(authToken, config.get("jwtPrivateKey"));
    req.user = decodedToken;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}
