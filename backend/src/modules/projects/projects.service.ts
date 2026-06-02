import { NextFunction, Request, Response } from "express"
import { createProjectRepo, deleteProjectRepo, getAllProjectRepo, getProjectCount } from "./projects.repository";

export const createProjectService = async (userId: string, projectName: string, description: string) => {

    // Check if project limit is reached
    const { max_projects, used_projects }: { max_projects: number; used_projects: number } = await getProjectCount(userId);

    if (Number(used_projects) >= max_projects) {
        return {
            success: false,
            message: "Project limit reached. Update your plan to creat new project."
        };
    }

    try {
        const project = await createProjectRepo(userId, projectName, description);

        return {
            success: true,
            data: project
        };
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
