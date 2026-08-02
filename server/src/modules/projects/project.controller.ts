import type { RequestHandler } from "express";
import { createProject, deleteProjectById, getProjectById, getUserProjects, updateProjectById } from "./project.service.js";
import type { CreateProjectInput, ProjectIdParams, UpdateProjectInput } from "./project.schema.js";

export const createProjectController: RequestHandler = async (req, res) => {
    const ownerId = res.locals.userId as string;
    const input = req.body as CreateProjectInput;

    const project = await createProject(input, ownerId);

    return res.status(201).json({
        data: project,
    });
}

export const getUserProjectsController: RequestHandler = async (_req, res) => {
    const userId = res.locals.userId as string;

    const projects = await getUserProjects(userId);

    return res.status(200).json({
        data: projects,
    })
}

export const getProjectByIdController: RequestHandler = async (req, res) => {
    const { projectId } = req.params as ProjectIdParams;
    const userId = res.locals.userId as string;

    const project = await getProjectById(projectId, userId);

    return res.status(200).json({
        data: project,
    })

}

export const updateProjectByIdController: RequestHandler = async (req, res) => {
    const { projectId } = req.params as ProjectIdParams;
    const input = req.body as UpdateProjectInput;
    const userId = res.locals.userId as string;

    const updatedProject = await updateProjectById(input, projectId, userId);

    return res.status(200).json({
        data: updatedProject,
    })
}

export const deleteProjectByIdController: RequestHandler = async (req, res) => {
    const { projectId } = req.params as ProjectIdParams;
    const userId = res.locals.userId as string;

    await deleteProjectById(projectId, userId);

    return res.status(204).send();
}