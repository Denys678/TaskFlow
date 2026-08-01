import { SignJWT } from "jose";

const jwtSecret = process.env.JWT_SECRET;
const accessTokenExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN ?? "15m";

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(jwtSecret);

export async function generateAccessToken(userId: string): Promise<string> {
    return new SignJWT({})
        .setProtectedHeader({
            alg: "HS256",
            typ: "JWT",
        })
        .setSubject(userId)
        .setIssuedAt()
        .setExpirationTime(accessTokenExpiresIn)
        .setIssuer("taskflow-api")
        .setAudience("taskflow-client")
        .sign(secretKey);
}