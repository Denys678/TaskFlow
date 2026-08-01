import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import { errorHandler } from "./common/middleware/errorhandler.js";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
    return res.status(200).json({
        status: "ok",
    });
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;