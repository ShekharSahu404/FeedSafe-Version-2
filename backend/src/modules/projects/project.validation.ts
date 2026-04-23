import { NextFunction, Request, Response } from "express";

export const validateCreateProjectInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { projectName, description } = req.body;
    const errors: { field: string; message: string }[] = [];

    if (!projectName?.trim()) {
        errors.push({ field: "projectName", message: "Project Name is required" });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }

    next();
};