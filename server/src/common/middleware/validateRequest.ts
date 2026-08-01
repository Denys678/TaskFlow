import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodType } from "zod";

type RequestTarget = "body" | "params" | "query";

export function validateRequest(schema: ZodType, target: RequestTarget): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction): void {
        const result = schema.safeParse(req[target]);

        if (!result.success) {
            next(result.error);
            return;
        }

        if (target === "query") {
            res.locals.query = result.data;
        } else {
            req[target] = result.data;
        }
        next();
    };
}