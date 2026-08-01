import type { RequestHandler } from "express";
import type { LoginInput, RegisterInput } from "./auth.schema.js";
import { getCurrentUser, loginUser, registerUser } from "./auth.service.js";

export const registerController: RequestHandler = async (req, res) => {
    const data = req.body as RegisterInput;

    const user = await registerUser(data);

    return res.status(201).json({
        data: user,
    });
}

export const loginController: RequestHandler = async (req, res) => {
    const data = req.body as LoginInput;

    const loginResult = await loginUser(data);

    return res.status(200).json({
        data: loginResult,
    })
}

export const getCurrentUserController: RequestHandler = async (_req, res) => {
    const userId = res.locals.userId;

    const user = await getCurrentUser(userId);

    return res.status(200).json({
        data: user,
    })
} 