import { NextFunction, Request, Response } from "express"
import { createProjectRepo, getAllProjectRepo } from "./projects.repository";
import { AppError } from "../../utility/errorClass";

export const createProjectService = async (userId: string, projectName: string, description: string) => {
    console.log("createProjectService called")
    try {
        return await createProjectRepo(userId, projectName, description);
    } catch (error: any) {
        throw error;
    }
}


export const getAllProjectService = async (userId: string) => {
    console.log("createProjectService called")
    try {
        return await getAllProjectRepo(userId);
    } catch (error: any) {
        throw error;
    }
}

