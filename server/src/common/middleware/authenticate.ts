import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        next(new AppError({message: "Invalid or expired access token", statusCode: 401, code: "INVALID_ACCESS_TOKEN"}));
        return;
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
        next(new AppError({message: "Invalid or expired access token", statusCode: 401, code: "INVALID_ACCESS_TOKEN"}));
        return;
    }

    try {
        const userId = await verifyAccessToken(token);

        res.locals.userId = userId;
        next();
    } catch {
        next(new AppError({message: "Invalid or expired access token", statusCode: 401, code: "INVALID_ACCESS_TOKEN"}));
    }
}