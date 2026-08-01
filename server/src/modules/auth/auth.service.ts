import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import { AppError } from "../../common/errors/AppError.js";
import type { RegisterInput } from "./auth.schema.js";

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email,
        }
    });

    if (existingUser) {
        throw new AppError({
            message: "User with this email already exists",
            statusCode: 409,
            code: "EMAIL_ALREADY_EXISTS",
        });
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    });

    return user;
}