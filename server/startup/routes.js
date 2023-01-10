import express from "express";
import morgan from "morgan";
// Routes
import sessionsRoutes from "../routes/sessions.js";
import usersRoutes from "../routes/users.js";
import categoriesRoutes from "../routes/categories.js";
// Middlewares
import handleErrors from "../middlewares/handleErrors.js";

export default function (app) {
  //Middlewares
  app.use(morgan("dev"));
  app.use(express.json());
  // Main routes
  app.use("/api", sessionsRoutes, usersRoutes, categoriesRoutes);

  // Error handler middleware: called when error catcher catches an error, uncaught excpetion or unresolved promise
  app.use(handleErrors);
}
