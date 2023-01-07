import sessionsRoutes from "../routes/sessions.js";
import usersRoutes from "../routes/users.js";
import handleErrors from "../middlewares/handleErrors.js";
import morgan from "morgan";
import express from "express";

export default function (app) {
  //Middlewares
  app.use(morgan("dev"));
  app.use(express.json());
  // Main routes
  app.use("/api", sessionsRoutes, usersRoutes);

  // Error handler middleware: called when error catcher catches an error, uncaught excpetion or unresolved promise
  app.use(handleErrors);
}
