import { NextFunction, Request, Response } from "express"
import { getActivePlan } from "./plan.repository";


export const getAllPlan = async (req: Request, res: Response) => {
    let planData = await getActivePlan();
    if (!planData) {
        res.status(400).json({
            success: true,
            message: "No data found.",
            data: []
        })
    }
    res.status(200).json(
        {
            success: true,
            message: "Data retrieved successfully",
            data: planData || [],
        }
    )
}



