import { NextFunction, Request, Response } from "express"
import { createProjectService, getAllProjectService } from "./projects.service";



export const createProject = async (req: Request, res: Response) => {

    const { projectName, description } = req.body;
    const user = req.user;

    console.log("user data", user)
    const project = await createProjectService(user.userId, projectName, description);

    res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
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



