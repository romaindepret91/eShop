import express from "express";
import { auth } from "../controllers/auth.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.get("/auth", catchErrors(auth));

export default router;
