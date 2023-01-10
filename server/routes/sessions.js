import express from "express";
// Controller functions
import { startSession } from "../controllers/sessions.js";
// Middlewares
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.post("/sessions", catchErrors(startSession));

export default router;
