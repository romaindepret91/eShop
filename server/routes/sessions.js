import express from "express";
import { startSession } from "../controllers/sessions.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.post("/sessions", catchErrors(startSession));

export default router;
