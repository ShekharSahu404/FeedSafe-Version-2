import dotenv from "dotenv";

dotenv.config();

const required = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Value not found for variable ${key}`);
    }
    return value;
}

export const env = {

    port: Number(process.env.PORT || 3000),
    db: {
        host: required("DB_HOST"),
        port: Number(required("DB_PORT")),
        user: required("DB_USER"),
        password: required("DB_PASSWORD"),
        database: required("DB_NAME"),
    },
    jwtToken: process.env.JWT_SECRET
}