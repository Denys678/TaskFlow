import express from "express";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { getCurrentUserController, loginController, registerController } from "./auth.controller.js";
import { authenticate } from "../../common/middleware/authenticate.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema, "body"), registerController);
router.post("/login", validateRequest(loginSchema, "body"), loginController);
router.get("/me", authenticate, getCurrentUserController);

export default router;