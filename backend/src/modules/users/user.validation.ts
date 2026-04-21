import { Request, Response, NextFunction } from 'express';
import { emailRegex } from "../../utility/regex";


export const validateRegistrationInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email, password } = req.body;
    const errors: { field: string; message: string }[] = [];

    if (!username?.trim()) {
        errors.push({ field: "username", message: "Username is required" });
    }

    if (!email?.trim()) {
        errors.push({ field: "email", message: "Email is required" });
    }

    if (!emailRegex.test(email) && email?.trim()) {
        errors.push({ field: "email", message: "Enter valid email." });
    }

    if (!password || password.length < 6) {
        errors.push({
            field: "password",
            message: "Password must be at least 6 characters",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }

    next();
};


export const validateLoginInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    const errors: { field: string; message: string }[] = [];


    if (!email?.trim()) {
        errors.push({ field: "email", message: "Email is required" });
    }

    if (!emailRegex.test(email) && email?.trim()) {
        errors.push({ field: "email", message: "Enter valid email." });
    }

    if (!password) {
        errors.push({
            field: "password",
            message: "Password is required",
        });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }

    next();
};