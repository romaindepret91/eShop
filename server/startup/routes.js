import authRoutes from "../routes/auth.js";
import handleErrors from "../middlewares/handleErrors.js";

export default function (app) {
  app.use("/api", authRoutes);
  // Error handler middleware: called when error catcher catches an error
  app.use(handleErrors);
}
