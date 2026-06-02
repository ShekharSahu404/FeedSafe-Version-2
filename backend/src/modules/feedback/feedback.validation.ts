import { NextFunction, Request, Response } from "express";
import { isValidUUID } from "../../utility/regex";

export const validateAddFeedbackInput = (req: Request,
    res: Response,
    next: NextFunction) => {
    const { email, username, feedback, projectId } = req.body;
    const errors: { field: string; message: string }[] = [];

    if (!email?.trim()) {
        errors.push({ field: "email", message: "Email is required." });
    }

    if (!username?.trim()) {
        errors.push({ field: "username", message: "Username is required." });
    }

    if (!feedback?.trim()) {
        errors.push({ field: "feedback", message: "Feedback is required." });
    }
    if (!projectId?.trim()) {
        errors.push({ field: "projectId", message: "Project Id is required." });
    }
    if (!isValidUUID(projectId)) {
        errors.push({ field: "projectId", message: "Enter Valid project Id." });

    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors,
        });
    }

    next();

}