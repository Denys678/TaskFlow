import type { RequestHandler } from "express";
import type { RegisterInput } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";

export const registerController: RequestHandler = async (req, res) => {
    const data = req.body as RegisterInput;

    const user = await registerUser(data);

    return res.status(201).json({
        data: {
            user,
        },
    });
}