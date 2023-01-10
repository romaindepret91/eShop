import express from "express";
// Controller functions
import { createUser } from "../controllers/users.js";
// Middlewares
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.post("/users", catchErrors(createUser));

export default router;
