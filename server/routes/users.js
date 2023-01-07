import express from "express";
import { createUser } from "../controllers/users.js";
import catchErrors from "../middlewares/catchErrors.js";

const router = express.Router();

router.post("/users", catchErrors(createUser));

export default router;
