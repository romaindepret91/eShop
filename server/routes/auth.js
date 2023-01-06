import express from "express";
import { users } from "../controllers/auth.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.get("/users", catchErrors(users));

export default router;
