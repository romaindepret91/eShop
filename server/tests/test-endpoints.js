import express from "express";
const router = express.Router();
import { uploadFiles } from "../middlewares/uploadFiles.js";

export const testEndpoints = (app) => {
  app.use(
    "/test-uploadFiles",
    router.post("", uploadFiles, (req, res) => {
      return res.send("File uploaded with success");
    })
  );
};
