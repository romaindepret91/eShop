import { logger } from "../logs/logger.js";

/**
 * Handle errors, uncaught exceptions, unresolved promises
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export default function (err, req, res, next) {
  logger.error(err.message);
  res.status(500).send("Something failed");
}

// Logging levels:
// error
// warn
// info
// verbose
// debug
// silly
