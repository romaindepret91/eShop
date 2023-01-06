/**
 * Catch errors for a given route handler
 * @param {function} handler route handler async function
 * @returns async function with error handling: passes on the error to the error handler middleware
 */
export default function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
}
