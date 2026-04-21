import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_SECRET = env.jwtToken as string;
const JWT_EXPIRES_IN = "15m";

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
