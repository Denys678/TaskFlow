import express from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { loginController, registerController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema, "body"), registerController);
router.post("/login", validateRequest(loginSchema, "body"), loginController);

export default router;