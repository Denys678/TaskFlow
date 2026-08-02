import express from "express";
import { authenticate } from "../../common/middleware/authenticate.js";
import { validateRequest } from "../../common/middleware/validateRequest.js";
import { createProjectSchema, projectIdParamsSchema, updateProjectSchema } from "./project.schema.js";
import { createProjectController, deleteProjectByIdController, getProjectByIdController, getUserProjectsController, updateProjectByIdController } from "./project.controller.js";

const router = express.Router();

router.post("/", authenticate, validateRequest(createProjectSchema, "body"), createProjectController);
router.get("/", authenticate, getUserProjectsController);
router.get("/:projectId", authenticate, validateRequest(projectIdParamsSchema, "params"), getProjectByIdController);
router.patch("/:projectId", authenticate, validateRequest(projectIdParamsSchema, "params"), validateRequest(updateProjectSchema, "body"), updateProjectByIdController);
router.delete("/:projectId", authenticate, validateRequest(projectIdParamsSchema, "params"), deleteProjectByIdController);

export default router;