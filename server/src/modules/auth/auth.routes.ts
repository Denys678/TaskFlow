import express from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { registerSchema } from "./auth.schema.js";
import { registerController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema, "body"), registerController);

export default router;