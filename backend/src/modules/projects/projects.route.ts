import { Router, Response } from "express";
import { createProject, deleteProject, getAllProject } from "./projects.controller";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { validateCreateProjectInput } from "./project.validation";


const router = Router();

router.get("/getAll", authMiddleware, asyncHandler(getAllProject));
router.get("/create", authMiddleware, validateCreateProjectInput, asyncHandler(createProject));
// router.get("/update", authMiddleware, asyncHandler(getAllPlan));
router.get("/delete/:projectId", authMiddleware, asyncHandler(deleteProject));
// router.get("/:id", authMiddleware, asyncHandler(getAllPlan));

export default router;