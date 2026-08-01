import z from "zod";

export const registerSchema = z.strictObject({
    name: z.string().trim().min(2).max(50),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(8).refine((value) => Buffer.byteLength(value, "utf8") <= 72, { message: "Password must not exceed 72 bytes" }),
});

export const loginSchema = z.strictObject({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().nonempty(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;