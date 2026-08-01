import { AppError } from "../errors/AppError.js";
import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction){
    if (err instanceof ZodError) {
        return res.status(400).json({
            statusCode: 400,
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            issues: err.issues.map((issue) => ({
                field: issue.path.map(String).join(".") || "request",
                message: issue.message,
                code: issue.code,
            })),
        });
    }
    
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            code: err.code,
            message: err.message,
        });
    }

    console.error(err);
    
    return res.status(500).json({
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
    });
}