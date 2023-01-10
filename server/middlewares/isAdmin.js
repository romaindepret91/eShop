import User from "../models/user.js";
/**
 * Allow access to route if request is made by admin user
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export async function isAdmin(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isAdmin)
      return res.status(401).send("Access to resource unauthorized");
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
}
