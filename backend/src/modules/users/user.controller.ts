import { NextFunction, Request, Response } from "express"
import { createUser, login } from "./user.service";
import { generateAccessToken } from "../../utility/jwt";
import { deleteUserService, getUsers } from "./user.repository";



export const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await login(req.body);

    const token = generateAccessToken(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        }
    )
    res.status(200).json({
        success: true,
        message: "User logged in  successfully.",
        data: {
            token: token
        },
    });

}

export const getAllUser = async (req: Request, res: Response) => {
    console.log("req user", req.user)
    let data = await getUsers();

    if (!data) {
        res.status(400).json(
            {
                success: true,
                message: "No data found.",
                data: data || [],
            }
        )
    }

    res.status(200).json(
        {
            success: true,
            message: "Data retrieved successfully",
            data: data || [],
        }
    )
}


export const deleteUser = async (req: Request, res: Response) => {
    const userId: string = req?.params?.id as string;


    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    await deleteUserService(userId);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};

