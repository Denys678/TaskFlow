import z from "zod";

export const createProjectSchema = z.strictObject({
    name: z.string().trim().min(2).max(80),
    description: z.string().trim().max(500).optional(),
});

export const projectIdParamsSchema = z.strictObject({
    projectId: z.string().uuid(),
})

export const updateProjectSchema = z.strictObject({
    name: z.string().trim().min(2).max(80).optional(),
    description: z.string().trim().max(500).nullable().optional(),
}).refine(
    (data) => Object.values(data).some((value) => value !== undefined),
    {
        message: "At least one field must be provided",
    },
);

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type ProjectIdParams = z.infer<typeof projectIdParamsSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;