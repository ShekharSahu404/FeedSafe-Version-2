import { NextFunction, Request, Response } from "express"
import { createProjectRepo } from "./projects.repository";
import { AppError } from "../../utility/errorClass";

export const createProjectService = async (userId: string, projectName: string, description: string) => {
    console.log("createProjectService called")
    try {
        return await createProjectRepo(userId, projectName, description);
    } catch (error: any) {
        throw error;
    }
}