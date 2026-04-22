import { Router, Response } from "express";
import { getAllPlan } from "./plan.controller";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { authMiddleware } from "../../middlewares/authMiddleware";


const router = Router();

router.get("/plans", authMiddleware, asyncHandler(getAllPlan));

export default router;