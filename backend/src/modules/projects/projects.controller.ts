import { NextFunction, Request, Response } from "express"
import { createProjectService, deleteProjectService, getAllProjectService } from "./projects.service";



export const createProject = async (req: Request, res: Response) => {

    const { projectName, description } = req.body;
    const user = req.user;

    const project = await createProjectService(user.userId, projectName, description);


    if(!project.success){
        res.status(400).json({
            success: false,
            message: project.message
        })
    }

    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
    });
}

export const deleteProject = async (req: Request, res: Response) => {
    const projectId: string | string[] = req.params.projectId;
    const deleteProject = await deleteProjectService(projectId);

    res.status(200).json({
        success: true,
        message: "Project deleted successfully",
    });
}

export const getAllProject = async (req: Request, res: Response) => {

    const user = req.user;
    const project = await getAllProjectService(user.userId);

    res.status(201).json({
        success: true,
        message: "Project fetched successfully",
        data: project,
    });
}



