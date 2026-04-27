import { NextFunction, Request, Response } from "express"
import { createProjectRepo, deleteProjectRepo, getAllProjectRepo, getProjectCount } from "./projects.repository";
import { AppError } from "../../utility/errorClass";
import { error } from "node:console";

export const createProjectService = async (userId: string, projectName: string, description: string) => {

    // Check if project limit is reached
    const { max_projects, used_projects }: { max_projects: number; used_projects: number } = await getProjectCount(userId);

    console.log("project data", max_projects, "project data", used_projects);


    if (Number(used_projects) >= max_projects) {
        throw new Error("Project creation limit reached. Please upgrade your plan.");
    }

    try {
        return await createProjectRepo(userId, projectName, description);
    } catch (error: any) {
        throw error;
    }
}


export const getAllProjectService = async (userId: string) => {
    try {
        return await getAllProjectRepo(userId);
    } catch (error: any) {
        throw error;
    }
}

export const deleteProjectService = async (projectId: string | string[]) => {
    try {
        return await deleteProjectRepo(projectId);
    } catch (error: any) {
        throw error;
    }
}
