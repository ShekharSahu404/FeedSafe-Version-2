import { Request, Response } from "express"
import { addFeedbackService, getFeedbackProjectWiseService } from "./feedback.service";


export const addFeedback = async (req: Request, res: Response) => {
    const { username, email, feedback, projectId } = req.body;

    const response = await addFeedbackService(username, email, feedback, projectId);

    if (!response.success) {
        res.status(400).json({
            success: false,
            message: response.message
        })
    }

    res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
        data: response,
    });
}

export const getFeedbackProjectWise = async (req: Request, res: Response) => {

    const projectId: string | string[] = req.params.projectId;
    const response = await getFeedbackProjectWiseService(projectId);

    res.status(200).json({
        success: true,
        message: "Feedback fetched successfully",
        data: response,
    });

}